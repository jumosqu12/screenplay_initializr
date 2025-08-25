package co.com.bancolombia.certification.test.tasks;

import co.com.bancolombia.certification.test.interactions.Get;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Actor;
import io.restassured.http.ContentType;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class Gets implements Task {

    public Gets() {}

    @Override
    public <T extends Actor> void performAs(T actor){
        actor.attemptsTo(
            Get.resource("").with(
                        requestSpecification -> requestSpecification
                        .relaxedHTTPSValidation()
                        .contentType(ContentType.JSON)
                        .header("#", "")
                        .param("")
            )
        );
    }

    public static Gets get() {
        return instrumented(Gets.class);
    }
}