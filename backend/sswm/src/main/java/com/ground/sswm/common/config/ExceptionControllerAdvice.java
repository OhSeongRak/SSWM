package com.ground.sswm.common.config;


import com.ground.sswm.common.exception.SswmApiException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

//@RestControllerAdvice
public class ExceptionControllerAdvice extends ResponseEntityExceptionHandler {

    private final Logger logger = LoggerFactory.getLogger(ExceptionControllerAdvice.class);

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<Object> handleApiException(Exception exception, WebRequest request) {
        logger.error("Exception 발생 : {}", exception.getMessage());
        if (exception instanceof SswmApiException) {
            logger.error("Exception 처리 ");
            return handleExceptionInternal(exception, null, new HttpHeaders(),
                ((SswmApiException) exception).getStatus(), request);
        } else {
            return handleExceptionInternal(exception, null, new HttpHeaders(),
                HttpStatus.INTERNAL_SERVER_ERROR,
                request);
        }
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(
        Exception ex, Object body, HttpHeaders headers, HttpStatus status, WebRequest request) {

        return ResponseEntity.status(status).headers(headers)
            .body(ex.getMessage());
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
        MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status,
        WebRequest request) {

        String message = ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
        return ResponseEntity.badRequest().body(message);
    }
}
