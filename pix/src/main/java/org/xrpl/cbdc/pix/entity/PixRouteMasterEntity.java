package org.xrpl.cbdc.pix.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Timestamp;

@Table("PIX_ROUTE_MASTER")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PixRouteMasterEntity {
    @Id
    @Column("PRM_ROW_ID")
    private String prmRowId;
    @Column("RPAY_CODE")
    private String rpayCode;
    @Column("CBDC_COUNTRY_CODE")
    private String cbdcCountryCode;
    @Column("RPAY_GATEWAY_DOMAIN")
    private String rGatewayDomain;
    @Column("RPAY_GWATEWAY_URL_PATH")
    private String rpayGatewayUrlPath;
    @Column("ACTIVE")
    private String active;
    @Column("CREATED_DT")
    private Timestamp createdDt;
    @Column("CREATED_BY")
    private String createdBy;
    @Column("UPDATE_DT")
    private Timestamp updatedDt;
    @Column("UPDATE_BY")
    private String updateBy;
}
