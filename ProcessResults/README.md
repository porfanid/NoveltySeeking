# Process Results

## contents of the directory

This folder uses several scripts to auomate the process of creating excel documents with the downloaded results. The main file is the `save_to_csv.py` file and if there is something wrong with the stored data you can use the `restore_data.py` to fix some errors that may occur.

## Translations

The scripts support translation to multiple languages. In the translations folder, you will find a template script, which you can use to translate the script in your own language. 

### Create translation

To create a translation you will have to:

1) create a directory with the code of your language in the `translations folder`, for example `el`.
2) In there you will have to create a folder named `LC_MESSAGES` and in there to copy(Do not delete the original so that I don't have to recreate it) the `template.pot`
3) change the content of the .pot file to translate the strings
4) Run the command `msgfmt -o base.mo template` to compile it and be able to use it in the script

### Use Translation

To use the coresponding translation, you will have to open the `save_to_csv.py` script and edit the following line:

```python
locale.setlocale(locale.LC_ALL, 'el_GR.UTF-8')
```

And replace the language with the language code you just created.

### Publish the translation

If you create a new translation create a push request so that others can use it too.
