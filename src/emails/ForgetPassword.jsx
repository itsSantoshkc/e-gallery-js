import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
const ForgetPassword = () => {
  const main = {
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  };

  const email = "batmankc7@gmail.com";

  const forgetPasswordURL = "https://www.google.com";
  return (
    <Html>
      <Head />
      <Preview>To change the password of </Preview>
      <Tailwind>
        <Body className="bg-white" style={main}>
          <Container className="border border-solid border-[#eaeaea] my-[40px] mx-auto p-[20px] max-w-[465px] ">
            <Section>
              <Heading className="text-center">
                <strong>E-Gallery</strong>
              </Heading>
            </Section>
            <Section className="text-center">
              <Text className="text-center text-[18px]">Password Reset</Text>
              <Text className="text-center text-[18px]">
                To change the password of <strong>{email}</strong> at E-gallery:
              </Text>
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={forgetPasswordURL}
              >
                Forget Password
              </Button>

              <Text className="text-center text-[14px]">
                If you were not expecting this invitation, you can ignore this
                email. If you are concerned about your account's safety, please
                reply to this email to get in touch with us.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ForgetPassword;
