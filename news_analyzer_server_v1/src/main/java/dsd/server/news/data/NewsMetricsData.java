package dsd.server.news.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsMetricsData {
    private int totalWordCount;
    private int totalDuplicatedWordCount;
    private int sentenceCount;
    private Map<String, Integer> duplicatedWords;
    private String siteName;
    private String articleTopic;
    private String published;
}
