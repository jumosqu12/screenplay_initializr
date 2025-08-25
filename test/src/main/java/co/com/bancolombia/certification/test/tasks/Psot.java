package co.com.bancolombia.certification.test.tasks;

import co.com.bancolombia.certification.test.interactions.Post;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Actor;
import io.restassured.http.ContentType;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class Psot implements Task {

    public Psot() {}

    @Override
    public <T extends Actor> void performAs(T actor){
        actor.attemptsTo(
            Post.to("").with(
                        requestSpecification -> requestSpecification
                        .relaxedHTTPSValidation()
                        .contentType(ContentType.JSON)
                        .header("#", "")
                        .body("")
            )
        );
    }

    public static Psot psot() {
        return instrumented(Psot.class);
    }
}