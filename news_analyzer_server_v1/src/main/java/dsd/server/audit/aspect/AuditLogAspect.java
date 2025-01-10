package dsd.server.audit.aspect;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import dsd.server.audit.annotation.Auditable;
import dsd.server.audit.entity.AuditLogEntity;
import dsd.server.audit.service.AuditLogService;
import dsd.server.common.type.ActionType;
import dsd.server.common.type.EntityType;
import dsd.server.common.util.SecurityUtil;
import dsd.server.jwt.repository.JwtRepository;
import dsd.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;


@Aspect
@Slf4j
@Component
@RequiredArgsConstructor
public class AuditLogAspect {

    private final AuditLogService auditService;
    private final ObjectMapper objectMapper;
    private final SecurityUtil securityUtil;
    private final UserRepository userRepository;
    private final JwtRepository jwtRepository;

    @Async
    @AfterReturning(
            pointcut = "@annotation(auditable)",
            returning = "result",
            argNames = "joinPoint,auditable,result"
    )
    public void auditMethod(JoinPoint joinPoint, Auditable auditable, Object result) {
        try {
            Object[] args = joinPoint.getArgs();
            String oldValue = getOldValueForAudit(auditable, args);
            String newValue = getNewValueForAudit(auditable, result);
            AuditLogEntity auditLog = createAuditLogEntity(auditable, oldValue, newValue);
            auditService.saveAuditLog(auditLog);
        } catch (Exception e) {
            log.error("Error during audit logging", e);
        }
    }

    private String getOldValueForAudit(Auditable auditable, Object[] args) throws JsonProcessingException {
        if (auditable.action() == ActionType.UPDATE || auditable.action() == ActionType.DELETE) {
            if (args.length > 0) {
                Long id = (Long) args[0];
                return getOldValue(auditable.entity(), id);
            }
        }
        return null;
    }

    private String getNewValueForAudit(Auditable auditable, Object result) throws JsonProcessingException {
        if (auditable.action() == ActionType.CREATE || auditable.action() == ActionType.UPDATE) {
            return objectMapper.writeValueAsString(result);
        }
        return null;
    }

    private AuditLogEntity createAuditLogEntity(Auditable auditable, String oldValue, String newValue) {
        return AuditLogEntity.builder()
                .entityType(auditable.entity())
                .actionType(auditable.action())
                .modifiedBy(securityUtil.getCurrentUsername())
                .oldValue(oldValue)
                .newValue(newValue)
                .build();
    }

    private String getOldValue(EntityType entityType, Long id) throws JsonProcessingException {
        Object oldEntity = findOldEntityById(entityType, id);
        return oldEntity != null ? objectMapper.writeValueAsString(oldEntity) : null;
    }

    private Object findOldEntityById(EntityType entityType, Long id) {
        return switch (entityType) {
            case USERS -> userRepository.findById(id).orElse(null);
            case JWTS -> jwtRepository.findById(id).orElse(null);
            default -> throw new IllegalArgumentException("Unknown entity type: " + entityType);
        };
    }

}

