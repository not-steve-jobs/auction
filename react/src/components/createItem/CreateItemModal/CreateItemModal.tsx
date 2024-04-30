import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, List, Space, Input } from "antd";
import { SearchOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { productState } from "../../../context/product-context";
import screwdriverIcon from "../../../assets/images/screwdriver.svg";
import totlemIcon from "../../../assets/images/totem.svg";
import universeIcon from "../../../assets/images/universe.svg";
import ArrowToRight from "../../../assets/images/arrowright.svg";
import "./createItemModal.css";
import { getCategories } from "../../../services/products.service";

interface ICategory {
  id: string;
  name: string;
  subCategories?: ICategory[];
}

const CreateItemModal: React.FC = () => {
  const { onChangeInitialCategories, latestCategories, onChangeLatestCategories } = productState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemType, setItemType] = useState(0);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [initialCategories, setInitialCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setItemType(0);
    setIsModalOpen(false);
    setBreadcrumbs([]);
    setCategories([]);
    setInitialCategories([]);
  };

  const itemTypes = [
    {
      icon: screwdriverIcon,
      title: "Ծառայություն",
      description: "Figma ipsum component variant main layer."
    },
    {
      icon: totlemIcon,
      title: "Ապրանք",
      description: "Figma ipsum component variant main layer."
    },
    {
      icon: universeIcon,
      title: "Հավաքական ապրանք ",
      description: "Figma ipsum component variant."
    }
  ];

  const selectCategory = () => {
    navigate("/create-item", { replace: true });
  };

  const openCategory = (category: any) => {
    onChangeLatestCategories([...latestCategories, category]);
    setBreadcrumbs([...breadcrumbs, category["name"]]);
    if (!category.subCategories?.length) {
      selectCategory();
      return;
    }

    setCategories(category.subCategories);
  };

  let foundSearchCategory: ICategory[];

  const findInCategory = (categories: ICategory[], breadcrumb: string) => {
    let found: ICategory | undefined = undefined;

    categories.forEach((item: ICategory) => {
      if (found?.["name"]) return found;
      if (item.name === breadcrumb) {
        found = item;
        foundSearchCategory = categories;
        return found;
      } else if (item.subCategories) {
        findInCategory(item.subCategories, breadcrumb);
      }
    });
  };

  const findBreadCrumb = (categories: ICategory[], breadcrumb: string) => {
    findInCategory(categories, breadcrumb);

    return foundSearchCategory;
  };

  const selectBreadcrumb = (breadcrumb: string) => {
    const foundCategory: ICategory[] = findBreadCrumb([...initialCategories], breadcrumb);

    if (foundCategory) {
      setCategories([...foundCategory]);
      setBreadcrumbs([...breadcrumbs].slice(0, breadcrumbs.indexOf(breadcrumb)));
      onChangeLatestCategories([...latestCategories].slice(0, breadcrumbs.indexOf(breadcrumb)));
    }
  };

  return (
    <>
      <Button className="test" type="dashed" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title={itemType ? "Կատեգորիա" : "Տեսակ"}
        width={658}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}>
        <p>{itemType ? "Ընտրեք ապրանքի կատեգորիան" : "Ընտրեք թե ինչ եք ցանկանում ավելացնել"}</p>
        <div className="itemContainer">
          {itemType ? (
            <div className="categories">
              <Space.Compact size="large" className="categoriesSearch">
                <>
                  {breadcrumbs.map((item, index) => {
                    return (
                      <div key={index + item} className="breadcrumbsWrapper">
                        <p onClick={() => selectBreadcrumb(item)}>{item}</p>
                        {index !== breadcrumbs.length - 1 && (
                          <img className="breadcrumbArrow" src={ArrowToRight} />
                        )}
                      </div>
                    );
                  })}
                </>
                {!breadcrumbs.length && <Input addonBefore={<SearchOutlined />} />}
              </Space.Compact>
              <List
                dataSource={categories}
                key="name"
                renderItem={(item) => (
                  <List.Item className="categoryItem" onClick={() => openCategory(item)}>
                    {item["name"]}
                    {item["subCategories"] && (
                      <span>
                        <img src={ArrowToRight} />
                      </span>
                    )}
                  </List.Item>
                )}
              />
            </div>
          ) : (
            itemTypes.map((item, index) => (
              <div
                key={item.icon + index}
                className="item"
                onClick={async () => {
                  if (item.title == "Ապրանք") {
                    try {
                      const res = await getCategories();
                      setCategories(res.data);
                      setInitialCategories(res.data);
                      onChangeInitialCategories(res.data);
                      setItemType(index + 1);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                }}>
                <div>
                  <img src={item.icon} />
                </div>
                <div className="itemText">
                  <div className="itemTitle">{item.title} </div>
                  <div>{item.description} </div>
                </div>
              </div>
            ))
          )}
        </div>
        {!!breadcrumbs.length && (
          <Button
            type="primary"
            className="backButton"
            icon={<LeftCircleOutlined />}
            onClick={() => {
              setCategories(initialCategories);
              setBreadcrumbs([]);
              onChangeLatestCategories([]);
            }}>
            Վերադառնալ ցանկի սկիզբ
          </Button>
        )}
      </Modal>
    </>
  );
};

export default CreateItemModal;
