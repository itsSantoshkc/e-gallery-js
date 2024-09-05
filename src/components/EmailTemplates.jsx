import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

export const VerifyCodeEmail = ({ verificationCode }) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="px-2 mx-auto my-auto font-sans">
        <Container className="pb-4 text-center bg-black">
          <Text className="text-lg font-bold text-white">
            Verify Your Account
          </Text>
          <Heading className="text-sm text-white">
            Enter the following code to verify your account at E-gallery.
          </Heading>
          <Section className="w-2/3">
            <Text className="py-2 text-2xl font-bold tracking-widest text-white bg-gray-500 rounded-xl">
              {verificationCode}
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default VerifyCodeEmail;
