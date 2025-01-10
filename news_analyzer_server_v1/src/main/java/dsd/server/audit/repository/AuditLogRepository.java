package dsd.server.audit.repository;

import dsd.server.audit.entity.AuditLogEntity;
import dsd.server.common.type.EntityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLogEntity, Long> {
    List<AuditLogEntity> findByEntityType(EntityType entityType);

    List<AuditLogEntity> findByModifiedBy(String modifiedBy);

    List<AuditLogEntity> findByCreatedAtBetween(Instant startDate, Instant endDate);
}
