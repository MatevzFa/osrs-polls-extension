
$('fieldset.question').each((i) => {

    let $curQuestion = $('fieldset.question').eq(i);

    let $answers = $curQuestion.find('table');

    let $ansYes = $answers.find('tr').eq(0);
    let $ansNo = $answers.find('tr').eq(1);
    let $ansSkip = $answers.find('tr').eq(2);

    if ($ansYes.find('td').eq(0).text() == 'Yes' && $ansNo.find('td').eq(0).text() == 'No') {

        let yes = parseInt((/\((\d*) votes\)/g).exec($ansYes.find('td').eq(2).text())[1]);
        let no = parseInt((/\((\d*) votes\)/g).exec($ansNo.find('td').eq(2).text())[1]);
        let skip = $ansSkip.find('td').eq(2).text();
        if (skip)
            skip = parseInt((/\((\d*) votes\)/g).exec(skip)[1]);
        let validVotes = yes + no;

        if (yes / validVotes >= 0.75) {
            $curQuestion.addClass('passed');
        } else {
            $curQuestion.append('<p>This question needs ' + votesTillPassing(yes, validVotes) + ' more votes to pass.</p>');
            $curQuestion.addClass('failed');
        }

        $ansYes.find('td').eq(2).text(resultString(yes, validVotes));
        $ansNo.find('td').eq(2).text(resultString(no, validVotes));
        if (skip)
            $ansSkip.find('td').eq(2).text(skip + ' votes');

        $ansYes.find('td').eq(1).find('img').eq(1).attr('width', swordWidth(yes, validVotes) + 'px');
        $ansNo.find('td').eq(1).find('img').eq(1).attr('width', swordWidth(no, validVotes) + 'px');

        if (skip)
            $ansSkip.find('td').eq(1).html('');
    }
});

function resultString(votes, total) {
    return (votes / total * 100).toFixed(2) + '% (' + votes + ' votes)';
}

function swordWidth(votes, total) {
    let fullWidth = 202;
    return (votes / total * fullWidth).toFixed(0);
}

function votesTillPassing(votes, total) {
    return 3 * total - 4 * votes;
}
