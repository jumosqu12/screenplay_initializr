package co.com.bancolombia.certi.preuba.tasks;

import co.com.bancolombia.certi.preuba.interactions.Put;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Actor;
import io.restassured.http.ContentType;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class Commss implements Task {

    public Commss() {}

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

    public static Commss commss() {
        return instrumented(Commss.class);
    }
}