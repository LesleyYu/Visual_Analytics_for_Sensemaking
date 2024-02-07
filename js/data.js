// force writing dataset onto html page (now deprecated)

// dataset
let dataset = [
  { item: 'NYU', QS: '39', Location: '/', Tuition: '/', Salary: '/', Staff: '/', unknown: '/'},
  { item: 'Columbia', QS: '22', Location: '/', Tuition: '/', Salary: '/', Staff: '/', unknown: '/'},
  { item: 'UCL', QS: '8', Location: '/', Tuition: '/', Salary: '/', Staff: '/', unknown: '/'},
  { item: 'IC', QS: '6', Location: '/', Tuition: '/', Salary: '/', Staff: '/', unknown: '/'},
  { item: 'CMU', QS: '52', Location: '/', Tuition: '/', Salary: '/', Staff: '/', unknown: '/'},
]

// render 
for (let i=0; i< dataset.length; i++) {
  document.write(
    `
    <tr>
      <th>${i+1}</th>
      <td>
        <label for="edit_value"></label>
        <input type="text" id="edit_value" name="edit_value" value="${dataset[i].item}" size="10"/>
      </td>
      <td>
        <label for="edit_value"></label>
        <input type="text" id="edit_value" name="edit_value" value="${dataset[i].QS}" size="10"/>
      </td>
      <td>
        <label for="edit_value"></label>
        <input type="text" id="edit_value" name="edit_value" size="10"/>
      </td>
      <td>
        <label for="edit_value"></label>
        <input type="text" id="edit_value" name="edit_value" size="10"/>
      </td>
      <td>
        <label for="edit_value"></label>
        <input type="text" id="edit_value" name="edit_value" size="10"/>
      </td>
      <td>
        <label for="edit_value"></label>
        <input type="text" id="edit_value" name="edit_value" size="10"/>
      </td>
    </tr>
  `
  )
}
