package dsd.server.news.controller;

import dsd.server.common.response.ApiResponseData;
import dsd.server.news.data.NewsMetricsData;
import dsd.server.news.request.NewsAnalyzerRequest;
import dsd.server.news.service.NewsAnalyzerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class NewsController {

    private final NewsAnalyzerService newsAnalyzer;

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/news-analyzer")
    public ResponseEntity<ApiResponseData<NewsMetricsData>> analyzeNews(
            @RequestBody NewsAnalyzerRequest request) {
        ApiResponseData<NewsMetricsData> newsResponse = new ApiResponseData<>();
        try {
            if (request == null || request.getUrl() == null) {
                throw new IllegalArgumentException("URL cannot be null");
            }
            NewsMetricsData data = newsAnalyzer.analyzeText(request.getUrl());
            newsResponse.setSuccess(Boolean.TRUE);
            newsResponse.setData(data);
            return ResponseEntity.ok(newsResponse);
        } catch (IllegalArgumentException e) {
            ApiResponseData<NewsMetricsData> errorResponse = new ApiResponseData<>();
            errorResponse.setSuccess(false);
            errorResponse.setErrorMessage("Invalid URL format: Please ensure the URL contains valid date information (e.g., yyyy/mm/dd)");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            ApiResponseData<NewsMetricsData> errorResponse = new ApiResponseData<>();
            errorResponse.setSuccess(false);
            errorResponse.setErrorMessage("News analyzer failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}