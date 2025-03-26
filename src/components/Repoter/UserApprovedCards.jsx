import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { baseUrl } from '../../utils/const';
import html2canvas from 'html2canvas';
import facebook from '../../assets/facebook_5968764.png'
import instagram from '../../assets/social_15707814.png'
import youtube from '../../assets/social_15707749.png'
import iinsaf from '../../assets/iinsaf_logo_+_name-removebg-preview.png'
import signature from '../../assets/1000176827-removebg-preview.png'
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

// import './UserApprovedCards.css'

export const fetchApprovedCard = async () => {
    try {
        const response = await axios.get(`${baseUrl}getUserApprovedCards`, {
            headers: {
                Authorization: localStorage.getItem('userToken'), // Assuming token-based authentication
            },
        });
        return response.data.card; // Only return the card object
    } catch (error) {
        console.error('Error fetching approved card:', error);
        return null;
    }
};

const UserApprovedCards = () => {
    const [card, setCard] = useState(null);
    const [qrText, setQrText] = useState('')
    const [downloading, setDownloading] = useState(false)

    useEffect(() => {
        const fetchCard = async () => {
            const data = await fetchApprovedCard();
            if (data) {
                setCard(data);
                // setQrText(data.cardForId._id)
                setQrText(`http://localhost:3000/getReporterByIdCard?cardId=${data._id}`)
            }
        };
        fetchCard();

    }, []);

    const downloadPDF = async () => {
        if (!card) return;
        await setDownloading(true)
        const frontSide = document.getElementById('card-front');
        const backSide = document.getElementById('card-back');
        const pdf = new jsPDF('portrait', 'mm', [82.02, 127]); // Match card size

        try {
            // Capture the front side
            const frontCanvas = await html2canvas(frontSide, { scale: 2, useCORS: true });
            const frontImgData = frontCanvas.toDataURL('image/png');
            pdf.addImage(frontImgData, 'PNG', 0, 0, 82.02, 127);

            // Add a new page for the back side
            pdf.addPage();
            const backCanvas = await html2canvas(backSide, { scale: 2, useCORS: true });
            const backImgData = backCanvas.toDataURL('image/png');
            pdf.addImage(backImgData, 'PNG', 0, 0, 82.02, 127);

            // Save the PDF
            pdf.save(`${card.name}-IDCard.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
        await setDownloading(false)
    };

    if (!card) {
        return <div className='text-center mt-28'>
            <Link
                to={"/ReporterDashboard/card-requests"}
                style={{
                    margin: '20px 0px',
                    marginLeft: "",
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Apply For Card
            </Link>
        </div>;
    }

    const GenerateQRCode = ({ text, image }) => {
        return (
            <div style={{ textAlign: "center", alignContent: "center", alignItems: "center" }} className='mt-3 w-full'>
                {text && image ? (
                    <div className='flex justify-evenly' >
                        <img src={image} alt="notProvided" style={{ width: "70px", height: "70px", alignItems: "center", alignContent: "center", marginTop: "10px" }} />
                        <QRCodeCanvas value={text} size={90} />
                    </div>
                ) : (
                    <p>Please provide text to generate a QR code</p>
                )}
            </div>
        );
    };

    return (
        <div className=''>
            <h1 className='font-bold text-3xl py-2' style={{ textAlign: 'center' }}>Reporter Id-Card</h1>
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }} className="items-center justify-center flex gap-11">

                {/* Front Side ui */}
                <div className={`${downloading ? "hidden" : ""}`}>
                    <div
                        id="card-frontt"
                        style={{
                            width: '310px',
                            height: '480px',
                            border: '1px solid #ccc',
                            borderRadius: '20px',
                            backgroundColor: '#fff',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'row',
                            marginBottom: '20px',
                            position: "relative"
                        }}
                    >
                        {/* Left Red Strip */}
                        <div
                            style={{
                                background: 'red',
                                width: '49px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '24px',
                                textAlign: 'center',
                                fontWeight: 'bolder',
                                position: 'relative',
                            }}
                        >
                            <span
                                style={{
                                    transform: 'rotate(90deg)', // Rotate text to make it vertical
                                    whiteSpace: 'nowrap',
                                    fontSize: '32px',
                                    // marginLeft: "5px",
                                    fontWeight: "700",
                                    // fontFamily:"fantasy",
                                    letterSpacing: "10px",
                                    // color:"black"
                                }}
                            >
                                Raise Your Voice
                            </span>
                        </div>


                        {/* Right Content */}
                        <div style={{ width: '85%', padding: '10px', marginTop: "20px", alignItems: "center", display: "flex", flexDirection: "column" }}>

                            <div style={{ textAlign: 'center', marginBottom: '10px', display: "flex", justifyContent: "center" }}>
                                <img
                                    src={iinsaf}
                                    alt="Logo"
                                    style={{ width: '200px', height: '75px' }}
                                />
                            </div>
                            <h3 style={{
                                textAlign: 'center',
                                marginBottom: '1px',
                                fontWeight: 'bold',
                                color: "white",
                                background: "red",
                                fontSize: "30px",
                                alignItems: "",
                                verticalAlign: "",
                                width: "200px",
                                height: "50px",
                                display: "flex",
                                justifyContent: "center"
                            }}>
                                <span style={{ marginBottom: "0px", fontWeight: "900" }}>PRESS</span>
                            </h3>
                            <h3 className='text-center text-lg font-semibold text-gray-400' style={{ fontSize: "16px", fontWeight: "700" }}>Reporter</h3>

                            <span style={{ textAlign: 'center', marginBottom: '1px', lineHeight: "18px" }}>
                                <span style={{ fontSize: "24px", lineHeight: "0px", }} className='font-sans'> {card.name}</span>  <span style={{ fontWeight: "100" }} className='text-gray-500'>s/o <br /><span className='text-gray-500' style={{ fontWeight: "700", fontSize: "12px" }}>{card.fatherName}</span></span>
                            </span>

                            <div style={{ textAlign: 'center', marginBottom: '10px', display: "flex", justifyContent: "center" }}>
                                <img
                                    src={card.cardForId.photo}
                                    alt="Logo"
                                    style={{ border: "0px solid black", borderRadius: "50%", width: "120px", height: "120px", overflow: "hidden" }}
                                />
                            </div>
                            <div style={{ width: '80%', marginBottom: '2px', lineHeight: "17px" }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '70px 10px auto', marginBottom: '0px' }}>
                                    <div style={{ fontSize: '14px', fontWeight: '600' }}>iinsaf Id</div>
                                    <div style={{ textAlign: 'center' }}>:</div>
                                    <div style={{ fontSize: '14px', fontWeight: '400', marginLeft: "10px" }}>
                                        {(card.cardForId._id).slice(-7)}
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '70px 10px auto', marginBottom: '0px' }}>
                                    <div style={{ fontSize: '14px', fontWeight: '600' }}>Phone No</div>
                                    <div style={{ textAlign: 'center' }}>:</div>
                                    <div style={{ fontSize: '14px', fontWeight: '400', marginLeft: "10px" }}>{card.mobile}</div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '70px 10px auto', marginBottom: '0px', flexWrap: 'noWrap', textWrap: 'wrap' }}>
                                    <div style={{ fontSize: '14px', fontWeight: '600' }}>Address</div>
                                    <div style={{ textAlign: 'center' }}>:</div>
                                    <div style={{ fontSize: '14px', fontWeight: '400', marginLeft: "10px" }}>{card.address}</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0px', alignItems: '', fontSize: "12px" }} className='mt-2'>
                                    <div style={{ fontWeight: 'bold' }} className='mt-4 text-gray-400'>Approved By:</div>
                                    <div>
                                        <img src={signature} alt="" style={{ height: '70px', marginTop: "-15px" }} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Front Side download */}
                <div className={`${downloading ? "" : "hidden"}`}>
                    <div
                        id="card-front"
                        style={{
                            width: '310px',
                            height: '480px',
                            border: '1px solid #ccc',
                            borderRadius: '20px',
                            backgroundColor: '#fff',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'row',
                            marginBottom: '20px',
                            position: "relative"
                        }}
                    >
                        {/* Left Red Strip */}
                        <div
                            style={{
                                background: 'red',
                                width: '49px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '24px',
                                textAlign: 'center',
                                fontWeight: 'bolder',
                                position: 'relative',
                            }}
                        >
                            <span
                                style={{
                                    transform: 'rotate(90deg)', // Rotate text to make it vertical
                                    whiteSpace: 'nowrap',
                                    fontSize: '32px',
                                    marginLeft: "35px",
                                    fontWeight: "700",
                                    // fontFamily:"fantasy",
                                    letterSpacing: "10px",
                                    // color:"black"
                                }}
                            >
                                Raise Your Voice
                            </span>
                        </div>


                        {/* Right Content */}
                        <div style={{ width: '85%', padding: '10px', marginTop: "20px", alignItems: "center", display: "flex", flexDirection: "column" }}>

                            <div style={{ textAlign: 'center', marginBottom: '10px', display: "flex", justifyContent: "center" }}>
                                <img
                                    src={iinsaf}
                                    alt="Logo"
                                    style={{ width: '200px', height: '75px' }}
                                />
                            </div>
                            <h3 style={{
                                textAlign: 'center',
                                marginBottom: '1px',
                                fontWeight: 'bold',
                                color: "white",
                                background: "red",
                                fontSize: "30px",
                                alignItems: "",
                                verticalAlign: "",
                                width: "200px",
                                height: "40px",
                                display: "flex",
                                justifyContent: "center"
                            }}>
                                <span style={{ marginBottom: "30px", fontWeight: "900", marginTop: "-10px" }}>PRESS</span>
                            </h3>
                            <h3 className='text-center text-lg font-semibold text-gray-400' style={{ fontSize: "16px", fontWeight: "700", marginTop: "-14px" }}>Reporter</h3>

                            <span style={{ textAlign: 'center', marginBottom: '1px', lineHeight: "18px" }}>
                                <span style={{ fontSize: "24px", lineHeight: "0px", }} className='font-sans'> {card.name}</span>  <span style={{ fontWeight: "100" }} className='text-gray-500'>s/o <br /><span className='text-gray-500' style={{ fontWeight: "700", fontSize: "12px" }}>{card.fatherName}</span></span>
                            </span>

                            <div style={{ textAlign: 'center', marginBottom: '10px', display: "flex", justifyContent: "center", marginTop: "15px" }}>
                                <img
                                    src={card.cardForId.photo}
                                    alt="Logo"
                                    style={{ border: "0px solid black", borderRadius: "50%", width: "120px", height: "120px", overflow: "hidden" }}
                                />
                            </div>
                            <div style={{ width: '80%', marginBottom: '2px', lineHeight: "17px" }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '70px 10px auto', marginBottom: '0px' }}>
                                    <div style={{ fontSize: '14px', fontWeight: '600' }}>iinsaf Id</div>
                                    <div style={{ textAlign: 'center' }}>:</div>
                                    <div style={{ fontSize: '14px', fontWeight: '400', marginLeft: "10px" }}>
                                        {(card.cardForId._id).slice(-7)}
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '70px 10px auto', marginBottom: '0px' }}>
                                    <div style={{ fontSize: '14px', fontWeight: '600' }}>Phone No</div>
                                    <div style={{ textAlign: 'center' }}>:</div>
                                    <div style={{ fontSize: '14px', fontWeight: '400', marginLeft: "10px" }}>{card.mobile}</div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '70px 10px auto', marginBottom: '0px', flexWrap: 'noWrap', textWrap: 'wrap' }}>
                                    <div style={{ fontSize: '14px', fontWeight: '600' }}>Address</div>
                                    <div style={{ textAlign: 'center' }}>:</div>
                                    <div style={{ fontSize: '14px', fontWeight: '400', marginLeft: "10px" }}>{card.address}</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0px', alignItems: '', fontSize: "12px" }} className='mt-2'>
                                    <div style={{ fontWeight: 'bold' }} className='mt-2 text-gray-400'>Approved By:</div>
                                    <div>
                                        <img src={signature} alt="" style={{ height: '70px', marginTop: "-15px" }} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Back Side ui */}
                <div className={`${downloading ? "hidden" : ""}`}>
                    <div
                        id="card-backk"
                        style={{
                            width: '310px',
                            height: '480px',
                            border: '1px solid #ccc',
                            borderRadius: '20px',
                            backgroundColor: '#fff',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        {/* Left Red Strip */}
                        <div
                            style={{
                                backgroundColor: 'red',
                                width: '49px',
                                height: '127mm',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontSize: '24px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                position: 'relative',
                            }}
                        >
                            <span
                                style={{
                                    transform: 'rotate(90deg)',
                                    whiteSpace: 'nowrap',
                                    fontSize: '50px',
                                    letterSpacing: "20px",
                                    marginLeft: "10px",
                                    fontWeight: "900",
                                    fontFamily: ""

                                }}
                            >
                                <span className='text-white font-serif'>ii</span><span className='text-black'>nsaf</span>
                            </span>
                        </div>

                        {/* Right Content */}
                        <div style={{ width: '261px', padding: '10px', marginTop: "20px", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }} className='relative'>
                            <div
                                style={{
                                    width: '90%',
                                    marginTop: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                }}
                            >
                                <div style={{ display: 'flex', marginBottom: '0px' }}>
                                    <span style={{ width: '80px', textAlign: 'left', padding: '1px' }}>DOB</span>
                                    <span style={{ margin: '0 10px' }}>:</span>
                                    <span style={{ textAlign: 'left', fontWeight: '400', paddingLeft: '10px' }}>{new Date(card.dob).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                    })}</span>
                                </div>
                                <div style={{ display: 'flex', marginBottom: '0px' }}>
                                    <span style={{ width: '80px', textAlign: 'left', padding: '1px', fontWeight: 'bold', whiteSpace: 'nowrap', textWrap: "nowrap" }}>
                                        Aadhaar No
                                    </span>
                                    <span style={{ margin: '0 10px' }}>:</span>
                                    <span style={{ textAlign: 'left', fontWeight: '400', paddingLeft: '10px', textWrap: "nowrap" }}>
                                        {card.aadharCardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', marginBottom: '0px' }}>
                                    <span style={{ width: '80px', textAlign: 'left', padding: '1px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                                        Blood Group
                                    </span>
                                    <span style={{ margin: '0 10px' }}>:</span>
                                    <span style={{ textAlign: 'left', fontWeight: '400', paddingLeft: '10px' }}>{card.bloodGroup}</span>
                                </div>
                                <div style={{ display: 'flex', marginBottom: '4px', alignItems: 'center' }}>
                                    <span
                                        style={{
                                            width: '100px',
                                            textAlign: 'left',
                                            padding: '1px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Issue Date
                                    </span>
                                    <span style={{ margin: '0 10px' }}>:</span>
                                    <span
                                        style={{
                                            textAlign: 'left',
                                            fontWeight: '400',
                                            paddingLeft: '10px',
                                        }}
                                    >
                                        {new Date(card.updatedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', marginBottom: '4px', alignItems: 'center' }}>
                                    <span
                                        style={{
                                            width: '100px',
                                            textAlign: 'left',
                                            padding: '1px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Valid Up To
                                    </span>
                                    <span style={{ margin: '0 10px' }}>:</span>
                                    <span
                                        style={{
                                            textAlign: 'left',
                                            fontWeight: '400',
                                            paddingLeft: '10px',
                                        }}
                                    >
                                        {new Date(
                                            new Date(card.updatedAt).setFullYear(
                                                new Date(card.updatedAt).getFullYear() + 1
                                            )
                                        ).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div style={{ marginTop: '10px', fontSize: '19px' }} className="mt-8 ml-1">
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', marginTop: "10px" }}>
                                    <img
                                        src={instagram}
                                        alt="Instagram"
                                        style={{ width: '40px', height: '40px', marginRight: '10px', verticalAlign: 'middle' }}
                                    />
                                    <span className='' style={{ fontSize: "16px" }}>{card.cardForId.instagramPageUrl || "Not Available At Moment"}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                                    <img
                                        src={facebook}
                                        alt="Facebook"
                                        style={{ width: '40px', height: '40px', marginRight: '10px', verticalAlign: 'middle' }}
                                    />
                                    <span style={{ fontSize: "16px" }}>{card.cardForId.facebookPageUrl || "Not Available At Moment"}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                                    <img
                                        src={youtube}
                                        alt="YouTube"
                                        style={{ width: '40px', height: '40px', marginRight: '10px', verticalAlign: 'middle' }}
                                    />
                                    <span style={{ fontSize: "16px" }}>{card.cardForId.youtubeChannelUrl || "Not Available At Moment"}</span>
                                </div>
                            </div>


                            <GenerateQRCode text={qrText} image={instagram} />
                            <a href="www.iinsaf.com" target='_blank' className='mt-1 text-blue-700'>www.iinsaf.com</a>
                        </div>
                    </div>
                </div>

                {/* Back Side download */}
                <div className={`${downloading ? "" : "hidden"}`}>
                    <div
                        id="card-back"
                        style={{
                            width: '310px',
                            height: '480px',
                            border: '1px solid #ccc',
                            borderRadius: '20px',
                            backgroundColor: '#fff',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        {/* Left Red Strip */}
                        <div
                            style={{
                                backgroundColor: 'red',
                                width: '49px',
                                height: '127mm',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontSize: '24px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                position: 'relative',
                            }}
                        >
                            <span
                                style={{
                                    transform: 'rotate(90deg)',
                                    whiteSpace: 'nowrap',
                                    fontSize: '50px',
                                    letterSpacing: "20px",
                                    marginLeft: "30px",
                                    fontWeight: "900",
                                    fontFamily: ""
                                }}
                            >
                                <span className='text-white'>ii</span><span className='text-black'>nsaf</span>
                            </span>
                        </div>

                        {/* Right Content */}
                        <div style={{ width: '261px', padding: '10px', marginTop: "20px", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }} className='relative'>
                            <div
                                style={{
                                    width: '90%',
                                    marginTop: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                }}
                            >
                                <div style={{ display: 'flex', marginBottom: '0px' }}>
                                    <span style={{ width: '80px', textAlign: 'left', padding: '1px' }}>DOB</span>
                                    <span style={{ margin: '0 10px' }}>:</span>
                                    <span style={{ textAlign: 'left', fontWeight: '400', paddingLeft: '10px' }}>{new Date(card.dob).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                    })}</span>
                                </div>
                                <div style={{ display: 'flex', marginBottom: '0px' }}>
                                    <span style={{ width: '80px', textAlign: 'left', padding: '1px', fontWeight: 'bold', whiteSpace: 'nowrap', textWrap: "nowrap" }}>
                                        Aadhaar No
                                    </span>
                                    <span style={{ margin: '0 10px' }}>:</span>
                                    <span style={{ textAlign: 'left', fontWeight: '400', paddingLeft: '10px', textWrap: "nowrap" }}>
                                        {card.aadharCardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', marginBottom: '0px' }}>
                                    <span style={{ width: '80px', textAlign: 'left', padding: '1px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                                        Blood Group
                                    </span>
                                    <span style={{ margin: '0 10px' }}>:</span>
                                    <span style={{ textAlign: 'left', fontWeight: '400', paddingLeft: '10px' }}>{card.bloodGroup}</span>
                                </div>
                                <div style={{ display: 'flex', marginBottom: '0px' }}>
                                    <span style={{ width: '80px', textAlign: 'left', padding: '1px', fontWeight: 'bold' }}>Issue Date</span>
                                    <span style={{ margin: '0 10px' }}>:</span>
                                    <span style={{ textAlign: 'left', fontWeight: '400', paddingLeft: '10px', textWrap: "nowrap" }}>{new Date(card.updatedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                    })}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', marginBottom: '8px' }}>
                                    <span style={{ width: '80px', textAlign: 'left', padding: '1px', fontWeight: 'bold' }}>Valid Up To</span>
                                    <span style={{ margin: '0 10px' }}>:</span>
                                    <span style={{ textAlign: 'left', fontWeight: '400', paddingLeft: '10px' }}>
                                        {new Date(
                                            new Date(card.updatedAt).setFullYear(new Date(card.updatedAt).getFullYear() + 1)
                                        ).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div style={{ marginTop: '10px', fontSize: '19px' }} className="mt-8 ml-1">
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', marginTop: "10px" }}>
                                    <img
                                        src={instagram}
                                        alt="Instagram"
                                        style={{ width: '40px', height: '40px', marginRight: '10px', verticalAlign: 'middle' }}
                                    />
                                    <span className='' style={{ fontSize: "16px", marginTop: "-23px" }}>{card.cardForId.instagramPageUrl || "Not Available At Moment"}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                                    <img
                                        src={facebook}
                                        alt="Facebook"
                                        style={{ width: '40px', height: '40px', marginRight: '10px', verticalAlign: 'middle' }}
                                    />
                                    <span style={{ fontSize: "16px", marginTop: "-23px" }}>{card.cardForId.facebookPageUrl || "Not Available At Moment"}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                                    <img
                                        src={youtube}
                                        alt="YouTube"
                                        style={{ width: '40px', height: '40px', marginRight: '10px', verticalAlign: 'middle' }}
                                    />
                                    <span style={{ fontSize: "16px", marginTop: "-23px" }}>{card.cardForId.youtubeChannelUrl || "Not Available At Moment"}

                                    </span>
                                </div>
                            </div>


                            <GenerateQRCode text={qrText} image={instagram} />
                            <a href="www.iinsaf.com" target='_blank' className='mt-1 text-blue-700'>www.iinsaf.com</a>
                        </div>
                    </div>
                </div>



            </div>
            <div className='text-center'>
                <button
                    style={{
                        margin: '20px 0px',
                        marginLeft: "",
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                    onClick={downloadPDF}
                >
                    Download PDF
                </button>
            </div>
        </div >
    );
};

export default UserApprovedCards;