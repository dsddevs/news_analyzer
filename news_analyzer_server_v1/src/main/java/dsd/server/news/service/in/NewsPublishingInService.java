package dsd.server.news.service.in;

import dsd.server.news.service.NewsPublishingService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Optional;

@Service
public class NewsPublishingInService implements NewsPublishingService {

    private static final DateTimeFormatter OUTPUT_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    @Override
    public String formatTimeDifference(String url) {
        try {
            LocalDateTime publishDate = extractPublishDate(url);
            return publishDate.format(OUTPUT_FORMATTER);
        } catch (Exception e) {
            return "Publication date not found";
        }
    }

    private LocalDateTime extractPublishDate(String url) throws IOException {
        Document doc = Jsoup.connect(url).get();
        String dateStr = getMetaData(doc);
        return dateStr != null && !dateStr.isEmpty() ? getParsedDateTime(dateStr) : LocalDateTime.now();
    }

    private LocalDateTime getParsedDateTime(String dateStr) {
        try {
            return parseDateTime(dateStr);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private String getMetaData(Document doc) {
        return Optional
                .ofNullable(doc.select("meta[property='article:published_time']").first())
                .or(() -> Optional.ofNullable(doc.select("meta[name='publication_date']").first()))
                .or(() -> Optional.ofNullable(doc.select("meta[name='date']").first()))
                .or(() -> Optional.ofNullable(doc.select("time[datetime]").first()))
                .map(element -> element.attr("content").isEmpty()
                        ? element.attr("datetime")
                        : element.attr("content"))
                .orElse(null);
    }

    private LocalDateTime parseDateTime(String dateStr) {
        return tryParseInstant(dateStr)
                .orElseGet(() -> tryParseLocalDateTime(dateStr)
                        .orElseGet(() -> tryParseLocalDate(dateStr)
                                .orElseThrow(() -> new IllegalArgumentException("Unable to parse date: " + dateStr))));
    }

    private Optional<LocalDateTime> tryParseInstant(String dateStr) {
        try {
            return Optional.of(Instant.parse(dateStr)
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime());
        } catch (DateTimeParseException e) {
            return Optional.empty();
        }
    }

    private Optional<LocalDateTime> tryParseLocalDateTime(String dateStr) {
        try {
            return Optional.of(LocalDateTime.parse(dateStr));
        } catch (DateTimeParseException e) {
            return Optional.empty();
        }
    }

    private Optional<LocalDateTime> tryParseLocalDate(String dateStr) {
        try {
            return Optional.of(LocalDate.parse(dateStr).atStartOfDay());
        } catch (DateTimeParseException e) {
            return Optional.empty();
        }
    }
}