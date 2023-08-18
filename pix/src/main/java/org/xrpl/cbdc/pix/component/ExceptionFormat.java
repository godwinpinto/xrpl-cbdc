package org.xrpl.cbdc.pix.component;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.xrpl.cbdc.pix.exception.NonFatalException;
import org.xrpl.cbdc.pix.json.GenericResponse;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class ExceptionFormat {

    public Mono<ResponseEntity<GenericResponse>> errorMethodFormatter(Throwable error) {
        log.error("ERRRORO HERE");

        if (error instanceof NonFatalException e) {
            return Mono.just(new ResponseEntity<>(GenericResponse.builder()
                    .responseCode(500)
                    .errorCode(e.getErrCode())
                    .errorDesc(e.getMessage())
                    .build(), HttpStatus.BAD_REQUEST));
        } else {
            log.error(error.getMessage(),error.getCause());
            return Mono.just(new ResponseEntity<>(GenericResponse.builder()
                    .responseCode(500)
                            .errorCode(500)
                            .errorDesc(error.getMessage())
                            .build(), HttpStatus.BAD_REQUEST));
        }
    }
}
