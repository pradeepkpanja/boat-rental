import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import '../styles/style.css'

const RentalForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    phone: '',
    email: '',
    orderDate: '',
    rentalDate: '',
    startTime: '',
    endTime: '',
    boatType1: '',
    boatType2: '',
    hours: '',
    amountPaid: '',
    balanceDue: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/api/rentals', formData);
    generatePDF(response.data);
    updateExcelSheet(response.data);
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();
    doc.text(`Full Name: ${data.fullName}`, 10, 10);
    doc.text(`Street Address: ${data.streetAddress}`, 10, 20);
    doc.text(`City: ${data.city}`, 10, 30);
    doc.text(`Postal Code: ${data.postalCode}`, 10, 40);
    doc.text(`Phone: ${data.phone}`, 10, 50);
    doc.text(`Email: ${data.email}`, 10, 60);
    doc.text(`Order Date: ${data.orderDate}`, 10, 70);
    doc.text(`Rental Date: ${data.rentalDate}`, 10, 80);
    doc.text(`Start Time: ${data.startTime}`, 10, 90);
    doc.text(`End Time: ${data.endTime}`, 10, 100);
    doc.text(`Boat Type 1: ${data.boatType1}`, 10, 110);
    doc.text(`Boat Type 2: ${data.boatType2}`, 10, 120);
    doc.text(`Hours: ${data.hours}`, 10, 130);
    doc.text(`Amount Paid: ${data.amountPaid}`, 10, 140);
    doc.text(`Balance Due: ${data.balanceDue}`, 10, 150);
    doc.save(`${data.fullName}_Receipt.pdf`);
  };

  const updateExcelSheet = (data) => {
    // Load existing workbook if it exists
    let workbook;
    try {
      workbook = XLSX.readFile('Boat_Rental_Receipts.xlsx');
    } catch (error) {
      // If the file doesn't exist yet, create a new workbook
      workbook = XLSX.utils.book_new();
    }
  
    // Extract existing data from the workbook or create a new array
    const existingData = workbook.Sheets['Receipts']
      ? XLSX.utils.sheet_to_json(workbook.Sheets['Receipts'])
      : [];
  
    // Add new rental data to the existing data array
    existingData.push({
      FullName: data.fullName,
      StreetAddress: data.streetAddress,
      City: data.city,
      PostalCode: data.postalCode,
      Phone: data.phone,
      Email: data.email,
      OrderDate: data.orderDate,
      RentalDate: data.rentalDate,
      StartTime: data.startTime,
      EndTime: data.endTime,
      BoatType1: data.boatType1,
      BoatType2: data.boatType2,
      Hours: data.hours,
      AmountPaid: data.amountPaid,
      BalanceDue: data.balanceDue,
    });
  
    // Convert the combined data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(existingData);
  
    // Add or update the 'Receipts' sheet in the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Receipts');
  
    // Write the modified workbook back to the file
    XLSX.writeFile(workbook, 'Boat_Rental_Receipts.xlsx');
  };
  

  return (
    <div className='centered'>
        <h1>Boat Rental Receipt Generator</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
      </label>
 
      <label>
        Street Address:
        <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} required />
      </label>
    
      <label>
        City:
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
      </label>
    
      <label>
        Postal Code:
        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
      </label>
      
      <label>
        Phone:
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
      </label>
    
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Order Date:
        <input type="date" name="orderDate" value={formData.orderDate} onChange={handleChange} required />
      </label>
   
      <label>
        Rental Date:
        <input type="date" name="rentalDate" value={formData.rentalDate} onChange={handleChange} required />
      </label>
      
      <label>
        Start Time:
        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
      </label>
    
      <label>
       End Time:
        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
      </label>

      <label>
        Boat Type 1:
        <input type="text" name="boatType1" value={formData.boatType1} onChange={handleChange} required />
      </label>

      <label>
        Boat Type 2:
        <input type="text" name="boatType2" value={formData.boatType2} onChange={handleChange} required />
      </label>
 
      <label>
        Hours:
        <input type="number" name="hours" value={formData.hours} onChange={handleChange} required />
      </label>
       <label>
        Amount Paid:
        <input type="number" name="amountPaid" value={formData.amountPaid} onChange={handleChange} required />
      </label>
   
      <label>
        Balance Due:
        <input type="number" name="balanceDue" value={formData.balanceDue} onChange={handleChange} required />
      </label>
    
      <button type="submit">Generate Receipt</button>
    </form>
    </div>
  );
};

export default RentalForm;
