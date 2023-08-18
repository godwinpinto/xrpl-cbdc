package org.xrpl.cbdc.pix.json;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class GenericResponse {

    @JsonProperty("status_code")
    private int responseCode;

    @JsonProperty("error_code")
    private int errorCode;

    @JsonProperty("error_desc")
    private String errorDesc;

    @JsonProperty("body")
    private Object body;
}
