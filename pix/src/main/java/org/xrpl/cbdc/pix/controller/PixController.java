package org.xrpl.cbdc.pix.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.xrpl.cbdc.pix.component.ExceptionFormat;
import org.xrpl.cbdc.pix.json.GenericResponse;
import org.xrpl.cbdc.pix.service.AccountsService;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/v1/pix")
@Slf4j
public class PixController {

    @Autowired
    AccountsService accountsService;

    @Autowired
    ExceptionFormat exceptionFormat;


    @GetMapping("/account/{rpayId}/{countryCode}/{pixId}")
    public Mono<ResponseEntity<GenericResponse>> getAccountNumber(@PathVariable String rpayId, @PathVariable String countryCode, @PathVariable String pixId) {
        log.info(rpayId);
        log.info(countryCode);
        log.info(pixId);
        return accountsService.getAccount(pixId, rpayId, countryCode)
                .flatMap(getAccountResponse -> {
                    log.info("HERE");
                    return Mono.just(new ResponseEntity<>(GenericResponse.builder().responseCode(200).body(getAccountResponse).build(),HttpStatus.OK));
                })
                .onErrorResume(exceptionFormat::errorMethodFormatter);
    }


}
