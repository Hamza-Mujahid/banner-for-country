import {
  Banner,
  reactExtension,
  useSettings,
  Status,
  Text,
  useBillingAddress,
} from "@shopify/ui-extensions-react/checkout";
import { TextSize } from "@shopify/ui-extensions/build/ts/surfaces/checkout/components/shared";
import { MailingAddress } from "@shopify/ui-extensions/checkout";
import { useEffect, useState } from "react";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {

  const { bannerTitle, bannerText, bannerStatus, textSize, countryCodes } = useSettings();
  const [isAvailable, setIsAvailable] = useState(false);

  const codeOfCountries: string[] = (countryCodes as string).split(',');

  const { countryCode }: MailingAddress = useBillingAddress();

  useEffect(() => {
    const foundFromSettigns: boolean = codeOfCountries.some(code => code === countryCode);
    setIsAvailable(foundFromSettigns);
  }, [countryCode])

  return (
    <>
      {isAvailable && (
        <Banner
          title={(bannerTitle as string) ? (bannerTitle as string) : "Banner Title"}
          status={(bannerStatus as Status) ? (bannerStatus as Status) : "info"}
        >
          <Text size={(textSize as TextSize) ? (textSize as TextSize) : "extraSmall"}>
            {
              (bannerText as string) ? (bannerText as string) : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            }
          </Text>
        </Banner>
      )}
    </>
  );
}
