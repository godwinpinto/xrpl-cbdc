package org.xrpl.cbdc.pix.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.xrpl.cbdc.pix.component.GenerateUniqueId;
import org.xrpl.cbdc.pix.component.PixRouteMasterRefreshConfig;
import org.xrpl.cbdc.pix.json.PSPWrapper;
import org.xrpl.cbdc.pix.json.RpayPixResponse;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.net.URISyntaxException;

@Service
@Slf4j
public class AccountsService {

    @Autowired
    GenerateUniqueId generateUniqueId;

    @Autowired
    PixRouteMasterRefreshConfig pixRouteMasterRefreshConfig;

    public Mono<RpayPixResponse> getAccount(String pixId, String rpayCode, String countryCode) {
        log.info(pixId,rpayCode,countryCode);
        return pixRouteMasterRefreshConfig.getRoute(rpayCode,countryCode)
                .flatMap(entity -> {
                    WebClient client = WebClient.create();
                    try {
                        return client.get()
                                .uri(new URI(entity.getRGatewayDomain()+entity.getRpayGatewayUrlPath()+pixId.trim()))
                                .header("Authorization", "Bearer MY_SECRET_TOKEN")
                                .accept(MediaType.APPLICATION_JSON)
                                .retrieve()
                                .bodyToMono(PSPWrapper.class)
                                .flatMap(pspWrapper -> {
                                    return Mono.just(pspWrapper.getResponse());
                                })
                                .log()
                                .doOnError(error -> {
                                    log.error("error in Rpay call", error);
                                })
                                .onErrorReturn(RpayPixResponse.builder().xrplAccountNo("0").pixId(pixId).currency("").build());
                    } catch (URISyntaxException e) {
                        return Mono.just(RpayPixResponse.builder().xrplAccountNo("0").pixId(pixId).currency("").build());
                    }
                }).switchIfEmpty(Mono.just(RpayPixResponse.builder().xrplAccountNo("0").pixId(pixId).currency("").build()))
                .onErrorReturn(RpayPixResponse.builder().xrplAccountNo("0").pixId(pixId).currency("").build());
    }
}
