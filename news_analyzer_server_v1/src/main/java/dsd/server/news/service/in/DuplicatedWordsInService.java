package dsd.server.news.service.in;

import dsd.server.news.service.DuplicatedWordsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DuplicatedWordsInService implements DuplicatedWordsService {

    private final StopWordsInService stopWordsService;

    @Override
    public int countDuplicatedWords(String[] words, Map<String, Integer> wordDb) {
        Map<String, Integer> wordCounts = countWords(words);
        double averageFrequency = calculateAverageFrequency(wordCounts);
        return getSignificantWords(wordCounts, wordDb, averageFrequency);
    }

    private Map<String, Integer> countWords(String[] words) {
        Map<String, Integer> wordCounts = new HashMap<>();
        for (String word : words) {
            word = word.toLowerCase().trim();
            mergeWord(word, wordCounts);
        }
        return wordCounts;
    }

    private void mergeWord(String word, Map<String, Integer> wordCounts) {
        if (isValidWord(word) && !stopWordsService.isStopWord(word)) {
            wordCounts.merge(word, 1, Integer::sum);
        }
    }

    private double calculateAverageFrequency(Map<String, Integer> wordCounts) {
        return wordCounts.values().stream()
                .mapToInt(Integer::intValue)
                .average()
                .orElse(0.0);
    }

    private int getSignificantWords(Map<String, Integer> wordCounts, Map<String, Integer> wordDb, double averageFrequency) {
        return wordCounts.entrySet().stream()
                .filter(entry -> isSignificantWord(entry.getKey(), entry.getValue(), averageFrequency))
                .mapToInt(entry -> processSignificantWord(entry, wordDb))
                .sum();
    }

    private int processSignificantWord(Map.Entry<String, Integer> entry, Map<String, Integer> wordDb) {
        String word = entry.getKey();
        int count = entry.getValue();
        wordDb.put(word, count);
        return calculateDuplicates(count);
    }

    private int calculateDuplicates(int count) {
        return count - 1;
    }

    private boolean isValidWord(String word) {
        if (word == null || word.length() <= 1) return false;
        if (word.matches(".*\\d+.*")) return false;
        if (word.length() < 3 || word.length() > 20) return false;
        return word.matches("[а-яА-Яa-zA-Z'-]+");
    }

    private boolean isSignificantWord(String word, int frequency, double averageFrequency) {
        if (frequency <= 1) return false;
        if (stopWordsService.isStopWord(word)) return false;
        int lengthThreshold = word.length() >= 7 ? 2 : 3;
        double frequencyThreshold = word.length() <= 4 ? averageFrequency * 1.5 : averageFrequency;
        return frequency >= lengthThreshold && frequency >= frequencyThreshold;
    }

}
