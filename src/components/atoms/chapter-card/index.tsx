import { Chapter } from "@/types";
import { Flex } from "antd";
import React, { FC, useRef } from "react";
import { TiLockClosed, TiLockOpen } from "react-icons/ti";
import { TbCoins } from "react-icons/tb";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiRequest from "@/utils/api-request";
import { useMutation } from "@tanstack/react-query";
import { addPurchasedChapter } from "@/store/slices/user.slice";
import store from "@/store/store";

const ChapterCard: FC<Chapter> = ({
  _id,
  title,
  isPremium,
  createdAt,
  price,
}) => {
  const user = useSelector((state: any) => state.user);
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("token");
  const hasCapturedPayment = useRef(false);

  const { mutate } = useMutation({
    mutationFn: async (orderId: any) => {
      return await apiRequest("payment/capture", {
        method: "POST",
        body: JSON.stringify({ orderId, chapterId: _id, userId: user?.id }),
      });
    },
    onSuccess: (response) => {
      if (response?.chapterId) {
        toast.success("Payment successful! Enjoy your chapter.");
        store.dispatch(addPurchasedChapter(response?.chapterId));
        push(`${pathname}/${response?.chapterId}`);
      } else {
        toast.error("Payment failed. Please try again.");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to capture payment.");
    },
  });

  const onChapterClick = () => {
    if (user?.purchasedChapters?.includes(_id)) {
      push(`${pathname}/${_id}`);
    } else if (isPremium) {
      if (!user.isLoggedIn) {
        toast.error("Please log in to buy premium");
      } else {
        if (orderId && !hasCapturedPayment.current) {
          hasCapturedPayment.current = true;
          mutate(orderId);
        } else {
          handlePaymentRedirect();
        }
      }
    } else {
      push(`${pathname}/${_id}`);
    }
  };

  const handlePaymentRedirect = async () => {
    try {
      const response = await apiRequest("payment/create", {
        method: "POST",
        body: JSON.stringify({ chapterId: _id }),
      });
      if (response?.status === "CREATED") {
        const approvalLink: any = response.links.find(
          (link: any) => link.rel === "approve"
        );

        if (approvalLink) {
          window.location.href = approvalLink.href;
        } else {
          toast.error("Unable to redirect to PayPal. Try again later.");
        }
      }
    } catch (error) {
      toast.error("Failed to initiate payment.");
    }
  };

  return (
    <Flex
      onClick={onChapterClick}
      className="p-4 border border-Black50 dark:border-Black100 cursor-pointer rounded-lg duration-300 hover:bg-Primary400 dark:hover:bg-Primary400 text-Black80 hover:text-white dark:bg-Primary800"
      gap={12}
    >
      {isPremium ? (
        <Flex
          align="center"
          className="rounded-lg bg-Primary200 dark:bg-Primary600 px-4"
          gap={4}
        >
          <TbCoins size={15} />
          {price}
        </Flex>
      ) : (
        <Flex
          className="rounded-lg bg-Primary200 dark:bg-Primary600 px-4 font-semibold text-xs md:text-base"
          align="center"
        >
          Free
        </Flex>
      )}
      <div>
        <h1 className="flex text-sm md:text-lg font-semibold">
          {title}
          {isPremium &&
            (user.purchasedChapters?.includes(_id) ? (
              <TiLockOpen size={25} color="var(--color-primary-1000)" />
            ) : (
              <TiLockClosed size={25} color="var(--color-primary-1000)" /> //
            ))}
        </h1>
        <p className="text-sm italic">{format(new Date(createdAt), "PPP")}</p>
      </div>
    </Flex>
  );
};

export default ChapterCard;
