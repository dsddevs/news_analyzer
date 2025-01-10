package dsd.server.news.service.in;

import dsd.server.news.service.NewsTitleService;
import org.springframework.stereotype.Service;

@Service
public class NewsTitleInService implements NewsTitleService {

    @Override
    public String handleTitle(String fullTitle) {
        fullTitle = removeCommonEndings(fullTitle);
        fullTitle = trimBySeparators(fullTitle);
        fullTitle = cleanUpTitle(fullTitle);
        return fullTitle;
    }

    private String removeCommonEndings(String fullTitle) {
        for (String ending : getCommonEndings()) {
            if (fullTitle.endsWith(ending)) {
                return fullTitle.substring(0, fullTitle.length() - ending.length()).trim();
            }
        }
        return fullTitle;
    }

    private String trimBySeparators(String fullTitle) {
        int earliestSeparator = fullTitle.length();
        for (String separator : getCommonSeparators()) {
            int index = fullTitle.indexOf(separator);
            if (index != -1 && index < earliestSeparator) {
                earliestSeparator = index;
            }
        }
        if (earliestSeparator < fullTitle.length()) {
            return fullTitle.substring(0, earliestSeparator).trim();
        }
        return fullTitle;
    }

    private String cleanUpTitle(String fullTitle) {
        return fullTitle
                .replaceAll("\\s+", " ")
                .replaceAll("^[\\p{Punct}\\s]+", "")
                .replaceAll("[\\p{Punct}\\s]+$", "");
    }
    private String[] getCommonSeparators(){
        return new String[]{" | ", " - ", " – ", " • ", " :: ", " / ", "»", "："};
    }

    private String[] getCommonEndings(){
        return new String[]{
                "| The Guardian",
                "- BBC News",
                "| BBC News",
                "| Reuters",
                "- Reuters",
                "- CNN",
                "| CNN",
                "| NYTimes",
                "- The New York Times",
                "| USA TODAY",
                "| Financial Times"
        };
    }


}
