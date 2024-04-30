import { changeDateFormat } from "./auctionDate.util";
import { getHourFromAntdDate } from "./getHour.util";

export const modifyProductFormData = (props: any) => {
  const {
    discount,
    name,
    desc,
    seller_delivery,
    shippingDatas,
    shippingIds,
    images,
    video,
    address,
    can_be_approached,
    region,
    city,
    postal_code,
    auction_duration,
    auction_quantity,
    releted_products,
    sale_type,
    extra_data,
    auction_start_time,
    auction_start_price,
    category_id,
    preferred_hours,
    preferred_days,
    auction_min_allowed_price,
    oneTimeSale_min_price,
    auction_min_insured_price,
    auction_direct_sales_price,
    auction_automatic_acceptance_price,
    oneTimeSale_start_price,
    oneTimeSale_quantity,
    oneTimeSale_automatic_acceptance_price,
    oneTimeSale_start_time
  } = props;

  const hours = preferred_hours?.map((item: {}) => {
    return getHourFromAntdDate(item);
  });
  const auctionDate = changeDateFormat(auction_start_time);
  const oneTimeSaleDate = changeDateFormat(oneTimeSale_start_time);

  let newExtraData = extra_data.map((item: { name: string; value: string }) => {
    return {
      name: item.name,
      value: item.value
    };
  });

  let discountData = discount.map((item: { quantity: string; percent: string }) => {
    return {
      quantity: item.quantity,
      percent: item.percent
    };
  });

  let rel_products = releted_products.map((item: { id: string }) => {
    return {
      child_id: item.id
    };
  });
  let saleInfo;

  if (sale_type == "auction") {
    saleInfo = {
      auction: {
        duration: auction_duration,
        start_time: auctionDate,
        start_price: auction_start_price,
        quantity: auction_quantity,
        direct_sales_price: auction_direct_sales_price,
        min_insured_price: auction_min_insured_price,
        min_allowed_price: auction_min_allowed_price,
        automatic_acceptance_price: auction_automatic_acceptance_price
      }
    };
  } else {
    saleInfo = {
      one_time_sale: {
        start_time: oneTimeSaleDate,
        start_price: oneTimeSale_start_price,
        quantity: oneTimeSale_quantity,
        min_allowed_price: oneTimeSale_min_price,
        automatic_acceptance_price: oneTimeSale_automatic_acceptance_price
      },
      discount: discountData
    };
  }

  let shipping;

  if (seller_delivery) {
    shipping = {
      shipping_templates: shippingDatas,
      shipping_template_ids: {
        ids: shippingIds
      }
    };
  } else {
    shipping = {};
  }

  return {
    status: props.status,
    images,
    video: [video.file],
    product: {
      name,
      category_id,
      desc,
      sale_type,
      extra_data: newExtraData,
      ...saleInfo,
      related_products: rel_products
    },
    shipping: {
      can_be_approached: can_be_approached,
      region_id: region,
      city_id: city,
      postal_code_id: postal_code,
      address: address,
      client_approach: {
        preferred_days: preferred_days,
        preferred_hours: hours
      },
      seller_delivery: seller_delivery,
      ...shipping
    }
  };
};
