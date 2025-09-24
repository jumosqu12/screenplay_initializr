package co.com.bancolombia.certificacion.prueba.tasks;

import co.com.bancolombia.certificacion.prueba.interactions.Get;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Actor;
import io.restassured.http.ContentType;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class ComsumirService implements Task {

    public ComsumirService() {}

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

    public static ComsumirService comsumirService() {
        return instrumented(ComsumirService.class);
    }
}