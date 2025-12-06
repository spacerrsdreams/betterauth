import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailVerificationEmailTemplateProps {
  firstName?: string;
  url?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
  : "";

export const EmailVerificationEmailTemplate = ({
  firstName,
  url,
}: EmailVerificationEmailTemplateProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-white text-[#24292e] font-github">
        <Preview>
          Verify your email address to complete your account setup
        </Preview>
        <Container className="max-w-[480px] mx-auto my-0 pt-5 pb-12 px-0">
          <Img src={`${baseUrl}/logo.svg`} width="32" height="32" alt="Logo" />

          <Text className="text-2xl leading-tight">
            <strong>{firstName}</strong>, please verify your email address to
            complete your account setup.
          </Text>

          <Section className="p-6 border border-solid border-[#dedede] rounded-[5px] text-center">
            <Text className="mb-[10px] mt-0 text-left">
              Hey <strong>{firstName}</strong>!
            </Text>
            <Text className="mb-[10px] mt-0 text-left">
              Thanks for signing up! Please verify your email address by
              clicking the button below. This link will expire in 24 hours.
            </Text>

            <Button
              href={url}
              className="text-sm bg-[#28a745] text-white leading-normal rounded-lg py-3 px-6"
            >
              Verify your email
            </Button>
          </Section>
          <Text className="text-center">
            <Link href={url} className="text-[#0366d6] text-[12px]">
              Can&apos;t click the button? Copy this link
            </Link>
          </Text>

          <Text className="text-[#6a737d] text-xs leading-[24px] text-center mt-[60px] mb-4">
            If you didn&apos;t create an account, you can safely ignore this
            email.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

EmailVerificationEmailTemplate.PreviewProps = {
  firstName: "",
  url: "",
} as EmailVerificationEmailTemplateProps;

export default EmailVerificationEmailTemplate;
