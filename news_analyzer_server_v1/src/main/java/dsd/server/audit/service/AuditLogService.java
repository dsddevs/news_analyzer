package dsd.server.audit.service;

import dsd.server.audit.entity.AuditLogEntity;
import dsd.server.common.type.EntityType;

import java.time.Instant;
import java.util.List;

public interface AuditLogService {
    void saveAuditLog(AuditLogEntity auditLog);

    List<AuditLogEntity> getAuditLogsForEntity(EntityType entityType);

    List<AuditLogEntity> getAuditLogsByUser(String username);

    List<AuditLogEntity> getAuditLogsForPeriod(Instant startDate, Instant endDate);
}
