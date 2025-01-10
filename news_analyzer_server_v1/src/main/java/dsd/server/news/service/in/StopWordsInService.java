package dsd.server.news.service.in;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Service
public class StopWordsInService {
    private final Set<String> stopWords;

    public StopWordsInService() {
        stopWords = new HashSet<>(Arrays.asList(
                "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
                "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
                "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
                "or", "an", "will", "my", "one", "all", "would", "there", "their", "has",
                "your", "when", "where", "our", "ours", "yours", "what", "had", "are", "is",
                "was",

                "и", "в", "во", "не", "что", "он", "на", "я", "с", "со",
                "как", "а", "то", "все", "она", "так", "его", "но", "да", "ты",
                "к", "у", "же", "вы", "за", "бы", "по", "только", "ее", "мне",
                "было", "вот", "от", "меня", "еще", "нет", "о", "из", "ему"
        ));
    }

    public boolean isStopWord(String word) {
        return stopWords.contains(word.toLowerCase());
    }
}