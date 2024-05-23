import React, { useState } from "react";
import axios from "axios";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import "../styles/style.css";

const RentalForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
    orderDate: "",
    rentalDate: "",
    startTime: "",
    endTime: "",
    boatType1: "",
    boatType2: "",
    hours: "",
    amountPaid: "",
    balanceDue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rentals",
        formData
      );
      generatePDF(response.data);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };
  const generatePDF = async (data) => {
    try {
      const existingPdfBytes = await fetch("/charter_reciept.pdf").then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch PDF: ${res.statusText}`);
        }
        return res.arrayBuffer();
      });
  
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
  
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
  
      firstPage.drawText(`Full Name: ${data.fullName}`, {
        x: 50,
        y: 700,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
  
      firstPage.drawText(`Street Address: ${data.streetAddress}`, {
        x: 50,
        y: 680,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
  
      firstPage.drawText(`City: ${data.city}`, {
        x: 50,
        y: 660,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
  
      firstPage.drawText(`Postal Code: ${data.postalCode}`, {
        x: 50,
        y: 640,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
  
      firstPage.drawText(`Phone: ${data.phone}`, {
        x: 50,
        y: 620,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
  
      firstPage.drawText(`Email: ${data.email}`, {
        x: 50,
        y: 600,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
  
      firstPage.drawText(`Order Date: ${data.orderDate}`, {
        x: 50,
        y: 580,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
  
      firstPage.drawText(`Rental Date: ${data.rentalDate}`, {
        x: 50,
        y: 560,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
  
      firstPage.drawText(`Start Time: ${data.startTime}`, {
        x: 50,
        y: 540,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
  
      firstPage.drawText(`End Time: ${data.endTime}`, {
        x: 50,
        y: 520,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
  
      firstPage.drawText(`Boat Type 1: ${data.boatType1}`, {
        x: 50,
        y: 500,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
  
      firstPage.drawText(`Boat Type 2: ${data.boatType2}`, {
        x: 50,
        y: 480,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
  
      firstPage.drawText(`Hours: ${data.hours}`, {
        x: 50,
        y: 460,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
  
      firstPage.drawText(`Amount Paid: ${data.amountPaid}`, {
        x: 50,
        y: 440,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
  
      firstPage.drawText(`Balance Due: ${data.balanceDue}`, {
        x: 50,
        y: 420,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
  
      const pdfBytes = await pdfDoc.save();
  
      // Create a Blob and download the updated PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${data.fullName}_Receipt.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };
  

  return (
    <div className="centered">
      <h1>Boat Rental Receipt Generator</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Street Address:
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Postal Code:
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Order Date:
          <input
            type="date"
            name="orderDate"
            value={formData.orderDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Rental Date:
          <input
            type="date"
            name="rentalDate"
            value={formData.rentalDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Start Time:
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Boat Type 1:
          <input
            type="text"
            name="boatType1"
            value={formData.boatType1}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Boat Type 2:
          <input
            type="text"
            name="boatType2"
            value={formData.boatType2}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Hours:
          <input
            type="number"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Amount Paid:
          <input
            type="number"
            name="amountPaid"
            value={formData.amountPaid}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Balance Due:
          <input
            type="number"
            name="balanceDue"
            value={formData.balanceDue}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Generate Receipt</button>
      </form>
    </div>
  );
};

export default RentalForm;
