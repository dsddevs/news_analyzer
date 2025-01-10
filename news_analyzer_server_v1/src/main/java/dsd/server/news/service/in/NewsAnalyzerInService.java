package dsd.server.news.service.in;

import dsd.server.common.exception.conflict.UrlConnectionFailedException;
import dsd.server.news.data.NewsMetricsData;
import dsd.server.news.service.DuplicatedWordsService;
import dsd.server.news.service.NewsAnalyzerService;
import dsd.server.news.service.NewsPublishingService;
import dsd.server.news.service.NewsTitleService;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NewsAnalyzerInService implements NewsAnalyzerService {

    private final NewsPublishingService publishingService;
    private final NewsTitleService newsTitle;
    private final DuplicatedWordsService duplicatedWords;

    @Override
    public NewsMetricsData analyzeText(String url) {
        String text = getArticleFromUrl(url);
        return getResultNewsAnalyzer(text, url);
    }

    private NewsMetricsData getResultNewsAnalyzer(String text, String url) {
        boolean isTextNotFound = text == null || text.isEmpty() || text.isBlank();
        return isTextNotFound ? getDefaultNewsMetrics() : getInitialNewsMetrics(text, url);
    }

    private NewsMetricsData getDefaultNewsMetrics() {
        return NewsMetricsData.builder()
                .totalWordCount(0)
                .totalDuplicatedWordCount(0)
                .sentenceCount(0)
                .duplicatedWords(Collections.emptyMap())
                .siteName("")
                .articleTopic("")
                .published("")
                .build();
    }

    private NewsMetricsData getInitialNewsMetrics(String text, String url) {
        String[] words = separateText(text);
        Map<String, Integer> wordsDb = new HashMap<>();
        int totalDuplicatedWords = duplicatedWords.countDuplicatedWords(words, wordsDb);
        return NewsMetricsData.builder()
                .totalWordCount(getTotalWordCount(text))
                .totalDuplicatedWordCount(totalDuplicatedWords)
                .sentenceCount(getSentenceCount(text))
                .duplicatedWords(wordsDb)
                .siteName(getSiteNameFromUrl(url))
                .articleTopic(getTitleFromUrl(url))
                .published(publishingService.formatTimeDifference(url))
                .build();
    }

    private int getTotalWordCount(String text) {
        return separateText(text).length;
    }

    private int getSentenceCount(String text) {
        return text.split("[.?!]+").length;
    }

    private String getSiteNameFromUrl(String url) {
        try {
            String host = getHost(url);
            validateHost(host);
            return host;
        } catch (Exception e) {
            throw new RuntimeException("Failed to analyze text: " + e.getMessage());
        }
    }

    private String getHost(String url) {
        try {
            return new URI(url).getHost();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private String getArticleFromUrl(String url) {
        return connectToUrl(url).body().text();
    }

    private String getTitleFromUrl(String url) {
        String fullFill = connectToUrl(url).title();
        return newsTitle.handleTitle(fullFill);
    }

    private Document connectToUrl(String url) {
        try {
            return Jsoup.connect(url).get();
        } catch (IOException e) {
            throw new UrlConnectionFailedException("Failed to connect to URL: " + url + " - " + e.getMessage());
        }
    }

    private String[] separateText(String text) {
        return text.split("[\\s\\p{Punct}]+");
    }

    private void validateHost(String host) {
        if (host == null || host.isEmpty()) {
            throw new IllegalArgumentException("Invalid URL: Host is missing");
        }
    }
}