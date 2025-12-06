import { siteConfig } from "@/config/site.config";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface PasswordResetEmailTemplateProps {
  userFirstname?: string;
  resetPasswordLink?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
  ? `${process.env.NEXT_PUBLIC_DOMAIN}`
  : "";

export const PasswordResetEmailTemplate = ({
  userFirstname,
  resetPasswordLink,
}: PasswordResetEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-[#f6f9fc] py-2.5">
          <Preview>{siteConfig.name} reset your password</Preview>
          <Container className="bg-white border border-solid border-[#f0f0f0] p-[45px]">
            <Img
              src={`${baseUrl}/static/dropbox-logo.png`}
              width="40"
              height="33"
              alt="Dropbox"
            />
            <Section>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                Hi {userFirstname},
              </Text>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                Someone recently requested a password change for your{" "}
                {siteConfig.name}
                account. If this was you, you can set a new password here:
              </Text>
              <Button
                className="bg-[#007ee6] rounded text-white text-[15px] no-underline text-center font-dropbox-sans block w-[210px] py-[14px] px-[7px]"
                href={resetPasswordLink}
              >
                Reset password
              </Button>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                Happy {siteConfig.name}ing!
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

PasswordResetEmailTemplate.PreviewProps = {
  userFirstname: "",
  resetPasswordLink: "",
} as PasswordResetEmailTemplateProps;

export default PasswordResetEmailTemplate;
