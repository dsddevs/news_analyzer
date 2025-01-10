package dsd.server.news.service;

import java.util.Map;

public interface DuplicatedWordsService {
    int countDuplicatedWords(String[] words, Map<String, Integer> wordDb);
}
