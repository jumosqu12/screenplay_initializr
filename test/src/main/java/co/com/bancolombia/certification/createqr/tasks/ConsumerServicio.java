package co.com.bancolombia.certification.createqr.tasks;

import co.com.bancolombia.certification.createqr.interactions.Post;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Actor;
import io.restassured.http.ContentType;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class ConsumerServicio implements Task {

    public ConsumerServicio() {}

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

    public static ConsumerServicio consumerServicio() {
        return instrumented(ConsumerServicio.class);
    }
}