package org.xrpl.cbdc.pix.json;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class RpayPixResponse {

    @JsonProperty("xrpl_account_no")
    private String xrplAccountNo;

    @JsonProperty("currency_accepted")
    private String currency;

    @JsonProperty("additional_data")
    private Object additionalData;

}
