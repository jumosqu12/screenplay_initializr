package co.com.bancolombia.certification.test.tasks;

import co.com.bancolombia.certification.test.interactions.Patch;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Actor;
import io.restassured.http.ContentType;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class Pathc implements Task {

    public Pathc() {}

    @Override
    public <T extends Actor> void performAs(T actor){
        actor.attemptsTo(
            Patch.to("").with(
                        requestSpecification -> requestSpecification
                        .relaxedHTTPSValidation()
                        .contentType(ContentType.JSON)
                        .header("#", "")
                        .body("")
            )
        );
    }

    public static Pathc pathc() {
        return instrumented(Pathc.class);
    }
}