package co.com.bancolombia.certification.test.tasks;

import co.com.bancolombia.certification.test.interactions.Options;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Actor;
import io.restassured.http.ContentType;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class Option implements Task {

    public Option() {}

    @Override
    public <T extends Actor> void performAs(T actor){
        actor.attemptsTo(
            Options.to("").with(
                        requestSpecification -> requestSpecification
                        .relaxedHTTPSValidation()
                        .contentType(ContentType.JSON)
                        .header("#", "")
                        .body("")
            )
        );
    }

    public static Option option() {
        return instrumented(Option.class);
    }
}