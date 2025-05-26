const cards = document.querySelectorAll('.usb-card');
const resetBtn = document.getElementById('resetBtn');

// Store complete data for each USB type
const usbData = [
  {
    type: 'A',
    person: { name: 'Username: xyz', location: 'Before the chase, there was a spark — return to where it was lit.' },
    metadata: {
      fileName: 'Project_Data_2023.pdf',
      author: 'Admin_BMT',
      lastModified: '20/01/2025',
      size: '1.2 MB'
    }
  },
  {
    type: 'B',
    person: { name: 'Username: Abc', location: 'Not every lift climbs high — find the one in the lab block that does.' },
    metadata: {
      fileName: 'Free_Screensaver.exe',
      author: '-',
      lastModified: '25/12/2016',
      size: '5.1 MB'
    }
  },
  {
    type: 'C',
    person: { name: 'Username: efg', location: 'A space made for the bros — downtime lives here' },
    metadata: {
      fileName: 'Invoice_2020.scr',
      author: 'Root_X',
      lastModified: '01/01/2020',
      size: '512 KB'
    }
  }
];

// Fisher-Yates shuffle algorithm
function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Update the data on cards
function updateData() {
  // Create a copy of the data and shuffle it
  const shuffledData = shuffle([...usbData]);
  
  // Update each card with the shuffled data
  document.querySelectorAll('.usb-card').forEach((card, index) => {
    const data = shuffledData[index];
    
    if (data) {
      // Update person info on the back
      const back = card.querySelector('.usb-back');
      back.querySelector('h2').textContent = data.person.name;
      back.querySelector('p').textContent = data.person.location;
      
      // Update metadata box
      const metadataBox = card.querySelector('.metadata-box');
      const fileInfo = metadataBox.querySelector('.file-info p');
      fileInfo.textContent = `File Name: ${data.metadata.fileName}
Author: ${data.metadata.author}
Last Modified: ${data.metadata.lastModified}
Size: ${data.metadata.size}`;
    }
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Add click event listeners to cards
  document.querySelectorAll('.usb-card').forEach(card => {
    card.addEventListener('click', () => {
      // Only allow flipping if no card is currently flipped
      const anyFlipped = document.querySelector('.usb-card.flipped');
      if (!anyFlipped) {
        card.classList.add('flipped');
        // Disable all card interactions after flipping
        document.querySelectorAll('.usb-card').forEach(c => {
          c.style.pointerEvents = 'none';
        });
      }
    });
  });

  // Add click event listener to reset button
  document.getElementById('resetBtn').addEventListener('click', () => {
    // Prompt for password first
    const password = prompt('Enter password to reset:');
    
    if (password === 'lol') {
      // First unflip any flipped cards
      document.querySelectorAll('.usb-card.flipped').forEach(card => {
        card.classList.remove('flipped');
      });

      // Re-enable card interactions
      document.querySelectorAll('.usb-card').forEach(card => {
        card.style.pointerEvents = 'auto';
      });

      // Wait for unflip animation to complete (800ms) then shuffle
      setTimeout(() => {
        const shuffledData = shuffle([...usbData]);
        
        // Update each card with the new shuffled data
        document.querySelectorAll('.usb-card').forEach((card, index) => {
          const data = shuffledData[index];
          
          if (data) {
            // Update person info on the back
            const back = card.querySelector('.usb-back');
            back.querySelector('h2').textContent = data.person.name;
            back.querySelector('p').textContent = data.person.location;
            
            // Update metadata box
            const metadataBox = card.querySelector('.metadata-box');
            const fileInfo = metadataBox.querySelector('.file-info p');
            fileInfo.textContent = `File Name: ${data.metadata.fileName}
Author: ${data.metadata.author}
Last Modified: ${data.metadata.lastModified}
Size: ${data.metadata.size}`;
          }
        });
      }, 800); // Wait for unflip animation to complete
    } else {
      // If wrong password, do nothing - cards stay as they are
      alert('Incorrect password!');
    }
  });

  // Initial data setup
  updateData();
});
