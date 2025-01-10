package dsd.server.audit.service;

import dsd.server.audit.entity.AuditLogEntity;
import dsd.server.audit.repository.AuditLogRepository;
import dsd.server.common.type.EntityType;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AuditLogInService implements AuditLogService {

    private final AuditLogRepository auditLogRepository;

    @Override
    public void saveAuditLog(AuditLogEntity auditLog) {
        auditLogRepository.save(auditLog);
    }

    @Override
    public List<AuditLogEntity> getAuditLogsForEntity(EntityType entityType) {
        return auditLogRepository.findByEntityType(entityType);
    }

    @Override
    public List<AuditLogEntity> getAuditLogsByUser(String username) {
        return auditLogRepository.findByModifiedBy(username);
    }

    @Override
    public List<AuditLogEntity> getAuditLogsForPeriod(Instant startDate, Instant endDate) {
        return auditLogRepository.findByCreatedAtBetween(startDate, endDate);
    }
}


