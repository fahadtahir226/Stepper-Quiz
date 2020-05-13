  window.addEventListener('DOMContentLoaded', () => {

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // console.log(user);

        document.getElementById('profilepic').src = user.photoURL;
        document.getElementById('mail').innerHTML = user.email;
        firebase.firestore().collection('Users').doc(user.uid)
        .get()
        .then(res => {
          // var source = res.metadata.fromCache ? "local cache" : "server"
          // console.log("Data came from " + source);

          // console.log("then : ",res.data())
          var Data = res.data();

          var table = document.getElementById('tableBody');
          if(document.getElementById('bodyTag').classList.contains('vit')){
            table.innerHTML = ` <tr>
            <td>Trực quan (V)</td>
            <td><span style="background: #f79647; color: white; padding: 10px; padding-right: ${(Data.V_value * 10)}px">${Data.V_value}</span></td>
            </tr>
            <tr>
            <td>Thính giác (A)</td>
            <td><span style="background: #4f81bc; color: white; padding: 10px; padding-right: ${(Data.A_value * 10)}px">${Data.A_value}</span></td>
            </tr>
            <tr>
            <td>Động học (K)</td>
            <td><span style="background: #c0504e; color: white; padding: 10px; padding-right: ${(Data.K_value * 10)}px">${Data.K_value}</span></td>
            </tr>
            <tr>
            <td>Thính giác-kỹ thuật số (Ad)</td>
            <td><span style="background: #9bbb58; color: white; padding: 10px; padding-right: ${(Data.Ad_value * 10)}px">${Data.Ad_value}</span></td>
            </tr>`;
          }
          else{
            table.innerHTML = ` <tr>
            <td>Visual (V)</td>
            <td><span style="background: #f79647; color: white; padding: 10px; padding-right: ${(Data.V_value * 10)}px">${Data.V_value}</span></td>
            </tr>
            <tr>
            <td>Auditory (A)</td>
            <td><span style="background: #4f81bc; color: white; padding: 10px; padding-right: ${(Data.A_value * 10)}px">${Data.A_value}</span></td>
            </tr>
            <tr>
            <td>Kinesthetic (K)</td>
            <td><span style="background: #c0504e; color: white; padding: 10px; padding-right: ${(Data.K_value * 10)}px">${Data.K_value}</span></td>
            </tr>
            <tr>
            <td>Auditory-digital (Ad)</td>
            <td><span style="background: #9bbb58; color: white; padding: 10px; padding-right: ${(Data.Ad_value * 10)}px">${Data.Ad_value}</span></td>
            </tr>`;
          }
          drawBasic(Data);
        })
        .catch( err => console.log('err:', err))
        // User is signed in.
      } else {
         window.location.replace('/');
        // No user is signed in.
      }
     });
  })

  function drawBasic(Data) {

    var data;
    if(document.getElementById('bodyTag').classList.contains('vit')){
      data = google.visualization.arrayToDataTable([
        ["Element", "Tỉ trọng"],
        ['Thính giác-kỹ thuật số (Ad)', Data.Ad_value],
        ['Động học (K)',  Data.K_value],
        ['Thính giác (A)',  Data.A_value],
        ['Visual (V)',  Data.V_value]
      ]);
    }
    else{

      data = google.visualization.arrayToDataTable([
        ["Element", "Density"],
        ['Auditory-digital (Ad)', Data.Ad_value],
        ['Kinesthetic (K)',  Data.K_value],
        ['Auditory (A)',  Data.A_value],
        ['Trực quan (V)',  Data.V_value]
      ]);
    }

    var options = {
      title: 'Điểm của bài kiểm tra đánh giá',
      chartArea: {width: '50%'},
      hAxis: {
        title: 'Tổng điểm',
        minValue: 0
      },
      // vAxis: {
      //   title: 'Parameters '
      // }
    };

    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

    chart.draw(data, options)
    // google.load('visualization', '1.0', {'packages':['corechart']});
    // google.setOnLoadCallback(drawChart);
  }