package dsd.server.news.service;

import dsd.server.news.data.NewsMetricsData;

public interface NewsAnalyzerService {
    NewsMetricsData analyzeText(String url);
}
