package co.com.bancolombia.certification.test.runners.primer;

import io.cucumber.junit.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/.../",
        glue = "co.com.bancolombia.certification.test.stepdefinitions",
        snippets = CucumberOptions.SnippetType.CAMELCASE
)
public class PrimerFeature {}