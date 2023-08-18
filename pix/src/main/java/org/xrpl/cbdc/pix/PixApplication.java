package org.xrpl.cbdc.pix;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
/*@SpringBootApplication(exclude = {
		DataSourceAutoConfiguration.class,
		DataSourceTransactionManagerAutoConfiguration.class,
		HibernateJpaAutoConfiguration.class,R2dbcAutoConfiguration.class})*/
@OpenAPIDefinition(info = @Info(title = "PIX", version = "1.0", description = "Payment Interface for XRPL"))
public class PixApplication {

	public static void main(String[] args) {
		SpringApplication.run(PixApplication.class, args);
	}

}
