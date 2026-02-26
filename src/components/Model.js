import React, { useEffect, useRef, useState } from "react";
import { ModelWrapper } from "@/styles/common.style";
import { useDispatch, useSelector } from "react-redux";
import { logoutSet } from "../../redux/reducers/slice/authSlice";
import { useRouter } from "next/router";

const BlockModel = () => {
    const router = useRouter();
    const userData = useSelector(
        (state) => state?.persistedReducer?.user?.userData
    );
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        if (userData?.id) {
            dispatch(logoutSet());
            router.push("/home");
        }
    }
    return (
        <>
            <ModelWrapper>
                <div className="modal-content">
                    <h2>Alert!</h2>
                    <p>Your account has been blocked. Please contact support.</p>
                    <div className='close-btn'>
                        <button onClick={handleCloseModal} className="btn common-btn-bt">Ok</button>
                    </div>
                </div>
            </ModelWrapper>
        </>
    );
};

export default BlockModel;
