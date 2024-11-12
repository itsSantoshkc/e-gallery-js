import React from "react";
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

const Otp = ({ receiver, verificationToken }) => {
  const main = {
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  };
  return (
    <Html>
      <Head />
      <Preview>Verify your email to log in</Preview>
      <Tailwind>
        <Body className="bg-white" style={main}>
          <Container className="border bg-stone-100 border-solid border-[#eaeaea] my-[40px] mx-auto p-[20px] max-w-[465px] ">
            <Section>
              <Heading className="text-center">
                <strong>E-Gallery</strong>
              </Heading>
            </Section>
            <Section>
              <Text className="text-center text-[18px]">
                Verify your email to log in
              </Text>
              <Text className="text-center text-[18px]">
                To verify <strong>{receiver}</strong> at E-gallery use the
                following code :<strong>{" " + verificationToken}</strong>
              </Text>

              <Text className="text-center text-[14px]">
                Please! Do not share this code with anyone else
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Otp;
