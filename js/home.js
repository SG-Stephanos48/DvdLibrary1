$(document).ready(function(){

	loadDvds();
	
	$('#create-button').click(function (event){
		
		var haveValidationErrors = checkAndDisplayValidationErrors($('#create-form').find('input'));

		if(haveValidationErrors) {
			return false;
		}

		$.ajax({
			type: 'POST',
			url: 'https://localhost:44375/api/Dvds1/PostDvd',
			data: JSON.stringify({
				Title: $('#add-title').val(),
				RealeaseYear: $('#add-realeaseYear').val(),
				Director: $('#add-director').val(),
				Rating: $('#add-rating').val(),
				Notes: $('#add-notes').val()
			
			/*url: 'http://localhost:8080/dvd',
			data: JSON.stringify({
				title: $('#add-title').val(),
				realeaseYear: $('#add-realeaseYear').val(),
				director: $('#add-director').val(),
				rating: $('#add-rating').val(),
				notes: $('#add-notes').val()
			*/
			}),
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			'datatype': 'json',
			success: function() {
				$('#errorMessages').empty();
				$('#add-title').val('');
				$('#add-realeaseYear').val('');
				$('#add-director').val('');
				$('#add-rating').val('');
				$('#add-notes').val('');
				loadDvds();
				hideCreateForm();
			},
			error: function() {
				$('#errorMessages')
				.append($('<li>')
				.attr({class: 'list-group-item list-group-item-danger'})
				.text('Error calling web service.  Please try again later.'));
			}
		})
		
	});

	$('#edit-button').click(function (event){

		var haveValidationErrors = checkAndDisplayValidationErrors($('#edit-form').find('input'));

		if(haveValidationErrors) {
			return false;
		}
		
		$.ajax({
			type: 'PUT',
			url: 'https://localhost:44375/api/Dvds1/Update',
			data: JSON.stringify({
				DvdId: $('#edit-dvd-id').val(),
				Title: $('#edit-title').val(),
				RealeaseYear: $('#edit-realeaseYear').val(),
				Director: $('#edit-director').val(),
				Rating: $('#edit-rating').val(),
				Notes: $('#edit-notes').val()

			/*url: 'http://localhost:8080/dvd/' + $('#edit-dvd-id').val(),
			data: JSON.stringify({
				dvdId: $('#edit-dvd-id').val(),
				title: $('#edit-title').val(),
				realeaseYear: $('#edit-realeaseYear').val(),
				director: $('#edit-director').val(),
				rating: $('#edit-rating').val(),
				notes: $('#edit-notes').val()
			*/
			}),
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			'datatype': 'json',
			success: function() {
				$('#errorMessages').empty();
				hideEditForm();
				loadDvds();
			},
			error: function() {
				$('#errorMessages')
				.append($('<li>')
				.attr({class: 'list-group-item list-group-item-danger'})
				.text('Error calling web service.  Please try again later.'));
			}
		})
		
	});

	$('#search-button').click(function (event){
		clearDvdTable();
		var contentRowsSearch = $('#contentRowsSearch');

		var haveValidationErrors = checkAndDisplayValidationErrors($('#search-form').find('input'));

		if(haveValidationErrors) {
			return false;
		}

		if ($('#search-category').val() == 'title')
		{
			$.ajax({
				type: 'GET',
				url: 'https://localhost:44375/api/Dvds1/Title/' + $('#search-term').val(),
				success: function(dvdArray) {
					$.each(dvdArray, function(index, dvd) {
						var title = dvd.Title;
						var realeaseYear = dvd.RealeaseYear;
						var director = dvd.Director;
						var rating = dvd.Rating;
						var dvdId = dvd.DvdId;
						
						var row = '<tr>';
							row += '<td>  <a onclick="showDetailInfo(' + dvdId + ')">' + title + '</a></td>';
							row += '<td>' + realeaseYear + '</td>';
							row += '<td>' + director + '</td>';
							row += '<td>' + rating + '</td>';
							row += '<td>  <a onclick="showEditForm(' + dvdId + ')">Edit</a> | <a onclick="deleteDvd(' + dvdId + ')">Delete</a></td>';
							row += '</tr>'
							
						contentRowsSearch.append(row);
					});

				/*url: 'http://localhost:8080/dvds/' + $('#search-category').val() + '/' + $('#search-term').val(),
				success: function(dvdArray) {
					$.each(dvdArray, function(index, dvd) {
						var title = dvd.title;
						var realeaseYear = dvd.realeaseYear;
						var director = dvd.director;
						var rating = dvd.rating;
						var dvdId = dvd.dvdId;
						
						var row = '<tr>';
							row += '<td>  <a onclick="showDetailInfo(' + dvdId + ')">' + title + '</a></td>';
							row += '<td>' + realeaseYear + '</td>';
							row += '<td>' + director + '</td>';
							row += '<td>' + rating + '</td>';
							row += '<td>  <a onclick="showEditForm(' + dvdId + ')">Edit</a> | <a onclick="deleteDvd(' + dvdId + ')">Delete</a></td>';
							row += '</tr>'
							
						contentRowsSearch.append(row);
					});
				*/
				}
				,
				error: function() {
					$('#errorMessages')
					.append($('<li>')
					.attr({class: 'list-group-item list-group-item-danger'})
					.text('Error calling web service.  Please try again later.'));
				}
			})
		}	
		else if ($('#search-category').val() == 'year')
		{
			$.ajax({
				type: 'GET',
				url: 'https://localhost:44375/api/Dvds1/Year/' + $('#search-term').val(),
				success: function(dvdArray) {
					$.each(dvdArray, function(index, dvd) {
						var title = dvd.Title;
						var realeaseYear = dvd.RealeaseYear;
						var director = dvd.Director;
						var rating = dvd.Rating;
						var dvdId = dvd.DvdId;
						
						var row = '<tr>';
							row += '<td>  <a onclick="showDetailInfo(' + dvdId + ')">' + title + '</a></td>';
							row += '<td>' + realeaseYear + '</td>';
							row += '<td>' + director + '</td>';
							row += '<td>' + rating + '</td>';
							row += '<td>  <a onclick="showEditForm(' + dvdId + ')">Edit</a> | <a onclick="deleteDvd(' + dvdId + ')">Delete</a></td>';
							row += '</tr>'
							
						contentRowsSearch.append(row);
					});

				/*url: 'http://localhost:8080/dvds/' + $('#search-category').val() + '/' + $('#search-term').val(),
				success: function(dvdArray) {
					$.each(dvdArray, function(index, dvd) {
						var title = dvd.title;
						var realeaseYear = dvd.realeaseYear;
						var director = dvd.director;
						var rating = dvd.rating;
						var dvdId = dvd.dvdId;
						
						var row = '<tr>';
							row += '<td>  <a onclick="showDetailInfo(' + dvdId + ')">' + title + '</a></td>';
							row += '<td>' + realeaseYear + '</td>';
							row += '<td>' + director + '</td>';
							row += '<td>' + rating + '</td>';
							row += '<td>  <a onclick="showEditForm(' + dvdId + ')">Edit</a> | <a onclick="deleteDvd(' + dvdId + ')">Delete</a></td>';
							row += '</tr>'
							
						contentRowsSearch.append(row);
					});
				*/
				}
				,
				error: function() {
					$('#errorMessages')
					.append($('<li>')
					.attr({class: 'list-group-item list-group-item-danger'})
					.text('Error calling web service.  Please try again later.'));
				}
			})
		}
		else if ($('#search-category').val() == 'director')
		{
			$.ajax({
				type: 'GET',
				url: 'https://localhost:44375/api/Dvds1/Director/' + $('#search-term').val(),
				success: function(dvdArray) {
					$.each(dvdArray, function(index, dvd) {
						var title = dvd.Title;
						var realeaseYear = dvd.RealeaseYear;
						var director = dvd.Director;
						var rating = dvd.Rating;
						var dvdId = dvd.DvdId;
						
						var row = '<tr>';
							row += '<td>  <a onclick="showDetailInfo(' + dvdId + ')">' + title + '</a></td>';
							row += '<td>' + realeaseYear + '</td>';
							row += '<td>' + director + '</td>';
							row += '<td>' + rating + '</td>';
							row += '<td>  <a onclick="showEditForm(' + dvdId + ')">Edit</a> | <a onclick="deleteDvd(' + dvdId + ')">Delete</a></td>';
							row += '</tr>'
							
						contentRowsSearch.append(row);
					});

				/*url: 'http://localhost:8080/dvds/' + $('#search-category').val() + '/' + $('#search-term').val(),
				success: function(dvdArray) {
					$.each(dvdArray, function(index, dvd) {
						var title = dvd.title;
						var realeaseYear = dvd.realeaseYear;
						var director = dvd.director;
						var rating = dvd.rating;
						var dvdId = dvd.dvdId;
						
						var row = '<tr>';
							row += '<td>  <a onclick="showDetailInfo(' + dvdId + ')">' + title + '</a></td>';
							row += '<td>' + realeaseYear + '</td>';
							row += '<td>' + director + '</td>';
							row += '<td>' + rating + '</td>';
							row += '<td>  <a onclick="showEditForm(' + dvdId + ')">Edit</a> | <a onclick="deleteDvd(' + dvdId + ')">Delete</a></td>';
							row += '</tr>'
							
						contentRowsSearch.append(row);
					});
				*/
				}
				,
				error: function() {
					$('#errorMessages')
					.append($('<li>')
					.attr({class: 'list-group-item list-group-item-danger'})
					.text('Error calling web service.  Please try again later.'));
				}
			})
		}
		else if ($('#search-category').val() == 'rating')
		{
			$.ajax({
				type: 'GET',
				url: 'https://localhost:44375/api/Dvds1/Rating/' + $('#search-term').val(),
				success: function(dvdArray) {
					$.each(dvdArray, function(index, dvd) {
						var title = dvd.Title;
						var realeaseYear = dvd.RealeaseYear;
						var director = dvd.Director;
						var rating = dvd.Rating;
						var dvdId = dvd.DvdId;
						
						var row = '<tr>';
							row += '<td>  <a onclick="showDetailInfo(' + dvdId + ')">' + title + '</a></td>';
							row += '<td>' + realeaseYear + '</td>';
							row += '<td>' + director + '</td>';
							row += '<td>' + rating + '</td>';
							row += '<td>  <a onclick="showEditForm(' + dvdId + ')">Edit</a> | <a onclick="deleteDvd(' + dvdId + ')">Delete</a></td>';
							row += '</tr>'
							
						contentRowsSearch.append(row);
					});

				/*url: 'http://localhost:8080/dvds/' + $('#search-category').val() + '/' + $('#search-term').val(),
				success: function(dvdArray) {
					$.each(dvdArray, function(index, dvd) {
						var title = dvd.title;
						var realeaseYear = dvd.realeaseYear;
						var director = dvd.director;
						var rating = dvd.rating;
						var dvdId = dvd.dvdId;
						
						var row = '<tr>';
							row += '<td>  <a onclick="showDetailInfo(' + dvdId + ')">' + title + '</a></td>';
							row += '<td>' + realeaseYear + '</td>';
							row += '<td>' + director + '</td>';
							row += '<td>' + rating + '</td>';
							row += '<td>  <a onclick="showEditForm(' + dvdId + ')">Edit</a> | <a onclick="deleteDvd(' + dvdId + ')">Delete</a></td>';
							row += '</tr>'
							
						contentRowsSearch.append(row);
					});
				*/
				}
				,
				error: function() {
					$('#errorMessages')
					.append($('<li>')
					.attr({class: 'list-group-item list-group-item-danger'})
					.text('Error calling web service.  Please try again later.'));
				}
			})
		}
	});
});

function showEditForm(dvdId) {
	$('#errorMessages').empty();
	
	$.ajax({
		type: 'GET',
		url: 'https://localhost:44375/api/Dvds1/' + dvdId,
		success: function(data, status) {
			$('#edit-title').val(data.Title);
			$('#edit-realeaseYear').val(data.RealeaseYear);
			$('#edit-director').val(data.Director);
			$('#edit-rating').val(data.Rating);
			$('#edit-notes').val(data.Notes);
			$('#edit-dvd-id').val(data.DvdId);

		/*url: 'http://localhost:8080/dvd/' + dvdId,
		success: function(data, status) {
			$('#edit-title').val(data.title);
			$('#edit-realeaseYear').val(data.realeaseYear);
			$('#edit-director').val(data.director);
			$('#edit-rating').val(data.rating);
			$('#edit-notes').val(data.notes);
			$('#edit-dvd-id').val(data.dvdId);
		*/
		},
		error: function() {
			$('#errorMessages')
			.append($('<li>')
			.attr({class: 'list-group-item list-group-item-danger'})
			.text('Error calling web service.  Please try again later.'));
		}
	})

	$('#dvdTableDiv').hide();
	$('#editFormDiv').show();
}

function showDetailInfo(dvdId) {
	$('#errorMessages').empty();
	
	$.ajax({
		type: 'GET',
		url: 'https://localhost:44375/api/Dvds1/' + dvdId,
		success: function(data, status) {
			$('#detail-title').val(data.Title);
			$('#detail-realeaseYear').val(data.RealeaseYear);
			$('#detail-director').val(data.Director);
			$('#detail-rating').val(data.Rating);
			$('#detail-notes').val(data.Notes);
			$('#detail-dvd-id').val(data.DvdId);

		/*url: 'http://localhost:8080/dvd/' + dvdId,
		success: function(data, status) {
			$('#detail-title').val(data.title);
			$('#detail-realeaseYear').val(data.realeaseYear);
			$('#detail-director').val(data.director);
			$('#detail-rating').val(data.rating);
			$('#detail-notes').val(data.notes);
			$('#detail-dvd-id').val(data.dvdId);
		*/
		
		},
		error: function() {
			$('#errorMessages')
			.append($('<li>')
			.attr({class: 'list-group-item list-group-item-danger'})
			.text('Error calling web service.  Please try again later.'));
		}
	})

	$('#dvdTableDiv').hide();
	$('#navDiv').hide();
	$('#showDetailDiv').show();
}

function loadDvds() {
	clearDvdTable();
	var contentRows = $('#contentRows');
		
	$.ajax({
		type: 'GET',
		url: 'https://localhost:44375/api/Dvds1/',
		success: function(dvdArray) {
			$.each(dvdArray, function(index, dvd) {
				var title = dvd.Title;
				var realeaseYear = dvd.RealeaseYear;
				var director = dvd.Director;
				var rating = dvd.Rating;
				var dvdId = dvd.DvdId;

		/*url: 'http://localhost:8080/dvds',
		success: function(dvdArray) {
			$.each(dvdArray, function(index, dvd) {
				var title = dvd.title;
				var realeaseYear = dvd.realeaseYear;
				var director = dvd.director;
				var rating = dvd.rating;
				var dvdId = dvd.dvdId;
		*/
		
			var row = '<tr>';
				row += '<td>  <a onclick="showDetailInfo(' + dvdId + ')">' + title + '</a></td>';
				row += '<td>' + realeaseYear + '</td>';
				row += '<td>' + director + '</td>';
				row += '<td>' + rating + '</td>';
				row += '<td>  <a onclick="showEditForm(' + dvdId + ')">Edit</a> | <a onclick="deleteDvd(' + dvdId + ')">Delete</a></td>';
				row += '</tr>'
				
			contentRows.append(row);
		});

		},
		error: function() {
			$('#errorMessages')
				.append($('<li>')
				.attr({class: 'list-group-item list-group-item-danger'})
				.text('Error calling web service.  Please try again later.'));
		}
	});		
}

function clearDvdTable() {
	$('#contentRows').empty();
}

function showCreateForm() {
	$('errorMessages').empty();
	
	$('#dvdTableDiv').hide();
	$('#createFormDiv').show();
}

function hideCreateForm() {
	$('errorMessages').empty();
	
	$('#createFormDiv').hide();
	$('#dvdTableDiv').show();
}

function hideEditForm() {
	$('errorMessages').empty();

	$('#edit-title').val('');
	$('#edit-realeaseYear').val('');
	$('#edit-director').val('');
	$('#edit-rating').val('');
	$('#edit-notes').val('');

	$('#editFormDiv').hide();
	$('#dvdTableDiv').show();
}

function hideDetailForm() {
	$('errorMessages').empty();

	$('#showDetailDiv').hide();
	$('#navDiv').show();
	$('#dvdTableDiv').show();
}

function deleteDvd(dvdId) {
	window.confirm("Are you sure you want to delete this Dvd from your collection?")
	
	if(confirm(""))
	{
		$.ajax({
			type: 'DELETE',
			url: 'https://localhost:44375/api/Dvds1/' + dvdId,
			//url: 'http://localhost:8080/dvd/' + dvdId,
			success: function() {
				loadDvds();
			}
		})
	}
	else
	{
		loadDvds();
	}

}

function checkAndDisplayValidationErrors(input) {

    $('#errorMessages').empty();

    var errorMessages = [];

    input.each(function() {

        if(!this.validity.valid)
        {
            var errorField = $('label[for='+this.id+']').text();
            errorMessages.push(errorField + ' ' + this.validationMessage);
        }
    });

    if (errorMessages.length > 0){
        $.each(errorMessages,function(index,message){
            $('#errorMessages').append($('<li>').attr({class: 'list-group-item list-group-item-danger'}).text(message));
        });

        return true;
    } else {

        return false;
    }
}