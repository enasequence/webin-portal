package uk.ac.ebi.ena.webin.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.system.ApplicationPidFileWriter;

@SpringBootApplication
public class SubAngApplication {

	private static String PID_FILE = "webin-portal.pid";

	public static void main(String[] args) {
		SpringApplication springApplication = new SpringApplication(SubAngApplication.class);
		springApplication.addListeners(new ApplicationPidFileWriter(PID_FILE));
		springApplication.run(args);
	}
}
