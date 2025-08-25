package co.com.bancolombia.certification.test.tasks;

import co.com.bancolombia.certification.test.interactions.Put;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Actor;
import io.restassured.http.ContentType;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class Put implements Task {

    public Put() {}

    @Override
    public <T extends Actor> void performAs(T actor){
        actor.attemptsTo(
            Put.to("").with(
                        requestSpecification -> requestSpecification
                        .relaxedHTTPSValidation()
                        .contentType(ContentType.JSON)
                        .header("#", "")
                        .body("")
            )
        );
    }

    public static Put put() {
        return instrumented(Put.class);
    }
}