/*
arr
Subjects = GET to api/subjects
for Subject in Subjects:
    Data = GET to api/data where SubjectID == bcrypt.hashSync(secret + Subject.id, 10)
    for Entry in response:
        arr.append(Subject.join(,) + Entry.join(,) + '/n')

sort by id
write arr to file.csv
*/