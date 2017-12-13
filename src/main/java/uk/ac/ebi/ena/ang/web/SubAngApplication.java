package uk.ac.ebi.ena.ang.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.system.ApplicationPidFileWriter;

@SpringBootApplication
public class SubAngApplication {

	private static String PID_FILE = "sub-ang.pid";

	public static void main(String[] args) {
		SpringApplication springApplication = new SpringApplication(SubAngApplication.class);
		springApplication.addListeners(new ApplicationPidFileWriter(PID_FILE));
		springApplication.run(args);
	}
}
