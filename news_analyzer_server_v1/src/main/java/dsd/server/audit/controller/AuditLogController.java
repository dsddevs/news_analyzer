package dsd.server.audit.controller;

import dsd.server.audit.entity.AuditLogEntity;
import dsd.server.audit.service.AuditLogService;
import dsd.server.common.type.EntityType;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@RestController
@RequestMapping("/api/audit")
@RequiredArgsConstructor
public class AuditLogController {

    private final AuditLogService auditService;

    @GetMapping("/entity/{entityType}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AuditLogEntity>> getEntityAuditLogs(
            @PathVariable EntityType entityType) {
        return ResponseEntity.ok(auditService.getAuditLogsForEntity(entityType));
    }

    @GetMapping("/user/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AuditLogEntity>> getUserAuditLogs(@PathVariable String username) {
        return ResponseEntity.ok(auditService.getAuditLogsByUser(username));
    }

    @GetMapping("/period")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AuditLogEntity>> getAuditLogsForPeriod(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return ResponseEntity.ok(auditService.getAuditLogsForPeriod(
                startDate.toInstant(ZoneOffset.UTC),
                endDate.toInstant(ZoneOffset.UTC)));
    }
}
