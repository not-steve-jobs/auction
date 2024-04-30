import EmailIcon from "../../../assets/images/email_icon.svg";
import PhoneIcon from "../../../assets/images/phone_icon.svg";
import GmailIcon from "../../../assets/images/gmail.svg";
import FbIcon from "../../../assets/images/fb_icon.svg";

import classes from "./classes";

const { INPUT_BASE_CLASSES, VALIDATION_TEXT_CLASS } = classes;

const RESEND_CODE_TIMER_DURATION = 60;
const REGISTER_JWT_DURATION = 600;
const FALLBACK =
  "data:image/png;base64,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";
let CATEGORIES;
const INPUT_FIELDS = [
  {
    key: "password",
    props: {
      label: "Գաղտնաբառ",
      className: INPUT_BASE_CLASSES,
      type: "password",
      name: "password"
    }
  },
  {
    key: "repeat_password",
    props: {
      label: "Կրկնել գաղտնաբառը",
      className: INPUT_BASE_CLASSES,
      type: "password",
      name: "repeat_password"
    }
  }
];

const INPUT_FIELDS_FOR_REGISTER = [
  {
    key: "full_name",
    props: {
      label: "Անուն Ազգանուն",
      className: INPUT_BASE_CLASSES,
      placeholder: "",
      type: "text",
      name: "full_name",
      maxLength: 255
    }
  },
  {
    key: "phone",
    props: {
      label: "Հեռախոսահամար",
      className: INPUT_BASE_CLASSES,
      type: "text",
      name: "phone"
    }
  },
  {
    key: "email",
    props: {
      label: "Էլ. հասցե",
      className: INPUT_BASE_CLASSES,
      type: "mail",
      name: "email",
      placeholder: "some@example.com",
      maxLength: 255
    }
  }
];

const INPUT_FIELDS_FOR_LOGIN = [
  {
    key: "user_name",
    props: {
      label: "Մուտքանուն",
      className: INPUT_BASE_CLASSES,
      type: "text",
      name: "user_name",
      placeholder: "Հեռախոսահամար, էլ. հասցե կամ ID",
      maxLength: 255
    }
  },

  {
    key: "password",
    props: {
      label: "Գաղտնաբառ",
      className: INPUT_BASE_CLASSES,
      type: "password",
      name: "password"
    }
  }
];

const PASS_REQUIREMENTS = [
  {
    key: 1,
    req: "isValidLength",
    text: "8 կամ ավել նիշ",
    className: VALIDATION_TEXT_CLASS
  },
  {
    key: 2,
    req: "hasUpperCaseLetter",
    text: "Առնվազն մեկ մեծատառ",
    className: VALIDATION_TEXT_CLASS
  },
  {
    key: 3,
    req: "hasLowerCaseLetter",
    text: "Առնվազն մեկ փոքրատառ",
    className: VALIDATION_TEXT_CLASS
  },

  {
    key: 4,
    req: "hasNumber",
    text: "Առնվազն մեկ թիվ",
    className: VALIDATION_TEXT_CLASS
  }
];

const COMMON_REGISTRATION_BUTTONS = [
  {
    key: "phone",
    label: "Հեռախոսահամարով",
    icon: PhoneIcon
  },
  {
    key: "email",
    label: "Էլ. հասցեով",
    icon: EmailIcon
  }
];

const MEDIA_REGISTRATION_BUTTONS = [
  {
    key: "google",
    label: "Google Account-ով",
    icon: GmailIcon
  },
  {
    key: "facebook",
    label: "Facebook-ով",
    icon: FbIcon
  }
];
// PRODUCT FORM
const MAIN_DATAS = [
  {
    key: "product_name",
    name: "name",
    label: "Անվանում",
    bordered: "true",
    type: "Input",
    required: true,
    message: "Անվանումը պարտադիր է!",
    attrs: {
      maxLength: 80,
      showCount: true,
      placeholder: "Անվանում"
    }
  },

  {
    key: "category",
    name: "category_id",
    label: "Կատեգորիա",
    placeholder: "Կատեգորիա",
    bordered: "true",
    type: "Select"
  },
  {
    key: "description",
    name: "desc",
    label: "Նկարագրություն",
    bordered: "true",
    attrs: {
      maxLength: 200,
      showCount: true,
      rows: 4,
      placeholder:
        "Գնորդներին տրամադրեք ձեր ապրանքի մասին հավելյալ ինֆորմացիա, նկարագրեք ապրանքի յուրահատկությունները"
    },
    type: "Textarea"
  },

  {
    key: "condition",
    name: "condition",
    label: "Վիճակ",
    placeholder: "Վիճակ",
    bordered: "true",
    type: "Select",
    required: true,
    message: "Վիճակը պարտադիր է!"
  },
  {
    key: "condition_description",
    name: "condition_desc",
    label: "Վիճակի մանրամասներ",
    bordered: "true",
    attrs: {
      maxLength: 200,
      showCount: true,
      rows: 4,
      placeholder: "Լրացրեք մանրամասներ"
    },
    type: "Textarea"
  },

  {
    key: "show_specifications",
    name: "show_specifications",
    label: "",
    placeholder: "Ցուցադրել հավելյալ բնութագրերը",
    bordered: "false",
    type: "Select",
    className: "select_outline"
  }
];

const SALES_DATA = [
  {
    key: "product_type",
    name: "sale_type",
    label: "Տեսակ",
    placeholder: "Տեսակ",
    type: "Select"
  }
];
const AUCTION_DATA = [
  {
    key: "duration",
    name: "duration",
    label: "Աուկցիոնի տեւողություն",
    placeholder: "Աուկցիոնի տեւողություն",
    type: "Select"
  }
];

const SWITCHES = [
  {
    key: "sw_1",
    valuePropName: "checked",
    name: "can_be_approached",
    title: "Ակտիվացրեք, եթե գնորդը կարող է անձամբ մոտենալ վերցնել ապրանքը",
    description:
      "Ակտիվացնելով դուք համաձայնվում եք, որ գնորդն ինքը մոտենա և վերցնի ծանրոցը ձեր նշած հասցեից"
  },
  {
    key: "sw_2",
    valuePropName: "checked",
    name: "seller_delivery",
    title: "Ակտիվացրեք, եթե պատրաստ եք ինքներդ առաքել ապրանքը",
    description:
      "Այս դեպքում դուք կարող եք ընտրել այն տարածաշրջանները, որտեղ պատրաստ եք իրականացնել առաքում"
  },

  {
    key: "sw_3",
    title: "Առաքման ծառայություններ",
    description:
      "Այս դեպքում մեր գործընկեր առաքման ծառայությունները կառաջարկեն գնացուցակ ձեր ծանրոցի առաքման համար ՀՀ ողջ տարածքում"
  }
];

const SALE_SWITCHES = [
  {
    key: "sale_sw_1",
    title: "Թույլատրել նաեւ ուղիղ վաճառք",
    description:
      "Գնորդը կարող է ձեռք բերել ձեր ապրանքը առանց աուկցիոնին մասնակցելու՝ վճարելով ձեր կողմից սահմանված ուղիղ վաճառքի գինը"
  },
  {
    key: "sale_sw_2",
    title: "Սահմանել վաճառքի նվազագույն ապահովագրված գին",
    description:
      "Նշեք այն գինը, որից ցածր գնով չեք պատրաստվում վաճառել ապրանքը՝ անկախ աուկցիոնի արդյունքներից"
  },

  {
    key: "sale_sw_3",
    title: "Թույլատրել գնառաջարկ ստանալը",
    description:
      "Ձեր ապրանքով հետաքրքրված գնորդները կարող են ձեզ գնառաջարկներ անել, որոնք դուք կարող եք ընդունել, մերժել և անել պատասխան առաջարկ"
  },
  {
    key: "sale_sw_4",
    title: "Սահմանել հրապարակման ամսաթիվ",
    description:
      "Սահմանեք այն ամսաթիվը, երբ ցանկանում եք ձեր ապրանքը հրապարակվի և դառնա հասանելի գնորդների համար"
  },
  {
    key: "sale_sw_5",
    title: "Հայտարարել կապակցված ապրանքներ",
    description: "Նշեք ձեր այն ապրանքները, որոնք կարող են հետաքրքրել գնորդին այս ապրանքը գնելիս"
  }
];

const DIRECT_SALE_SWITCHES = [
    {
      key: "dir_sale_sw_1",
      title: "Սահմանել զեղչ",
      description: "Առաջարկեք զեղչ, եթե գնորդը պատրաստվում է գնել ձեր ապրանքից մի քանի հատ"
    },
    {
      key: "dir_sale_sw_2",
      title: "Թույլատրել գնառաջարկ ստանալը",
      description:
        "Ձեր ապրանքով հետաքրքրված գնորդները կարող են ձեզ գնառաջարկներ անել, որոնք դուք կարող եք ընդունել, մերժել և անել պատասխան առաջարկ"
    },

    {
      key: "dir_sale_sw_3",
      title: "Սահմանել հրապարակման ամսաթիվ",
      description:
        "Սահմանեք այն ամսաթիվը, երբ ցանկանում եք ձեր ապրանքը հրապարակվի և դառնա հասանելի գնորդների համար"
    },
    {
      key: "dir_sale_sw_4",
      title: "Հայտարարել կապակցված ապրանքներ",
      description: "Նշեք ձեր այն ապրանքները, որոնք կարող են հետաքրքրել գնորդին այս ապրանքը գնելիս"
    }
  ],
  SHIPPING_DATA_SELECT = [
    {
      key: "region",
      name: "region",
      label: "Մարզ",
      placeholder: "Մարզ",
      type: "Select"
    },
    {
      key: "city",
      name: "city",
      label: "Քաղաք",
      placeholder: "Քաղաք",
      type: "Select"
    },
    {
      key: "postal_code",
      name: "postal_code",
      label: "Փոստալ կոդ",
      placeholder: "Փոստալ կոդ",
      type: "Select"
    }
  ];

export default {
  CATEGORIES,
  FALLBACK,
  SWITCHES,
  MAIN_DATAS,
  SALES_DATA,
  INPUT_FIELDS,
  AUCTION_DATA,
  SALE_SWITCHES,
  PASS_REQUIREMENTS,
  DIRECT_SALE_SWITCHES,
  SHIPPING_DATA_SELECT,
  REGISTER_JWT_DURATION,
  INPUT_FIELDS_FOR_LOGIN,
  INPUT_FIELDS_FOR_REGISTER,
  RESEND_CODE_TIMER_DURATION,
  COMMON_REGISTRATION_BUTTONS,
  MEDIA_REGISTRATION_BUTTONS
};
